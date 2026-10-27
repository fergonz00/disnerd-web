# -*- coding: utf-8 -*-
"""Prueba el formulario de cotizacion y su medicion, en un navegador de verdad.

Vive en el repo a proposito: la version anterior de estas pruebas estaba en
una carpeta temporal y se perdio al reiniciarse la sesion.

    python _tools/test_formulario.py                   (contra los archivos locales)
    DISNERD_BASE=https://disnerd.com.ar python ...      (contra produccion)
"""
import os
import pathlib
import sys

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = pathlib.Path(__file__).resolve().parent.parent
BASE = os.environ.get("DISNERD_BASE", "")

# El navegador con el que entra la mayoria: el de adentro de Instagram.
IG = ("Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 "
      "(KHTML, like Gecko) Mobile/21F79 Instagram 339.0.0.30.105 (iPhone14,3; iOS 17_5)")

# GA4 se bloquea en las pruebas por dos motivos: si cargara, pisaria a `gtag`
# con el suyo y no se veria nada; y ademas estas corridas ensuciarian las
# metricas de verdad con visitas que no existen.
ESPIA = """
window.__wa = null;
window.dataLayer = window.dataLayer || [];
window.open = function (u) { window.__wa = u; return null; };
"""

# El snippet de GA4 declara `function gtag()` en el HTML, asi que pisa
# cualquier window.gtag que se ponga antes. Los eventos se leen entonces de
# dataLayer, que es donde ese gtag los deja.
LEER = """() => (window.dataLayer || [])
  .filter(a => a[0] === 'event')
  .map(a => [a[1], a[2] || {}])"""


def sin_ga4(pg):
    pg.route("**/gtag/js*", lambda r: r.abort())
    pg.route("**/g/collect*", lambda r: r.abort())
    pg.route("**/googletagmanager.com/**", lambda r: r.abort())

fallos = []


def ok(desc, cond, detalle=""):
    print(("  OK    " if cond else "  FALLA") + "  " + desc +
          ("" if cond else "  -> " + str(detalle)))
    if not cond:
        fallos.append(desc)


def uri(*partes):
    if BASE:
        return BASE.rstrip("/") + "/" + "/".join(partes)
    r = RAIZ
    for x in partes:
        r = r / x
    return (r / "index.html" if r.is_dir() else r).as_uri()


def nombres(pg):
    return [e[0] for e in pg.evaluate(LEER)]


def correr(pg, url):
    sin_ga4(pg)
    pg.add_init_script(ESPIA)
    pg.goto(url)
    pg.wait_for_timeout(900)
    return pg


with sync_playwright() as p:
    nav = p.chromium.launch()
    ctx = nav.new_context(viewport={"width": 390, "height": 844}, user_agent=IG,
                          is_mobile=True, has_touch=True)
    errores = []
    pg = ctx.new_page()
    pg.on("pageerror", lambda e: errores.append(str(e)))
    correr(pg, uri())

    print("LA HOME, EN EL NAVEGADOR DE INSTAGRAM")
    ok("el formulario se dibuja", pg.locator(".cq-dest-btn").count() == 3,
       pg.locator(".cq-dest-btn").count())
    ok("'quienes' y 'cuando' tienen opciones",
       pg.locator("#cq-quienes option").count() > 5 and
       pg.locator("#cq-cuando option").count() > 15)

    ok("antes de bajar NO se contó que lo vieron", "ver_formulario" not in nombres(pg),
       nombres(pg))
    pg.locator("#cotiza").scroll_into_view_if_needed()
    pg.wait_for_timeout(800)
    ok("al llegar hasta él se cuenta ver_formulario", "ver_formulario" in nombres(pg),
       nombres(pg))

    pg.locator('.cq-dest-btn[data-dest="Orlando"]').click()
    pg.wait_for_timeout(250)
    ev = dict((n, d) for n, d in pg.evaluate(LEER))
    ok("elegir destino cuenta el paso 1",
       ev.get("cotiza_paso", {}).get("paso") == "1-destino", ev.get("cotiza_paso"))
    ok("el paso viaja en 'item', que es lo que GA4 sabe desglosar",
       ev.get("cotiza_paso", {}).get("item") == "1-destino", ev.get("cotiza_paso"))
    ok("y sigue contando iniciar_cotizacion, para poder comparar con antes",
       "iniciar_cotizacion" in ev)

    # cambiar de opinion no puede contar dos veces, o el embudo miente
    antes = len(pg.evaluate(LEER))
    pg.locator('.cq-dest-btn[data-dest="Crucero"]').click()
    pg.wait_for_timeout(250)
    ok("cambiar de destino no lo cuenta de nuevo",
       len(pg.evaluate(LEER)) == antes)

    pg.select_option("#cq-quienes", index=2)
    pg.wait_for_timeout(250)
    pasos = [d.get("paso") for n, d in pg.evaluate(LEER) if n == "cotiza_paso"]
    ok("elegir quiénes van cuenta el paso 2", "2-quienes" in pasos, pasos)

    pg.select_option("#cq-cuando", index=3)
    pg.wait_for_timeout(250)
    pasos = [d.get("paso") for n, d in pg.evaluate(LEER) if n == "cotiza_paso"]
    ok("elegir cuándo cuenta el paso 3", "3-cuando" in pasos, pasos)

    pg.locator(".cq-submit").click()
    pg.wait_for_timeout(500)
    ev = dict((n, d) for n, d in pg.evaluate(LEER))
    ok("mandar cuenta enviar_cotizacion", "enviar_cotizacion" in ev)
    ok("el mensaje va con el destino que quedó elegido",
       ev.get("enviar_cotizacion", {}).get("destino") == "Crucero",
       ev.get("enviar_cotizacion"))
    wa = pg.evaluate("window.__wa") or ""
    ok("abre WhatsApp con el mensaje ya escrito",
       wa.startswith("https://wa.me/") and "Crucero" in wa, wa[:70])

    ok("sin errores de javascript", not errores, errores)

    # ── que no se pueda mandar a medias ──
    pg2 = ctx.new_page()
    pg2.on("pageerror", lambda e: errores.append(str(e)))
    correr(pg2, uri())
    pg2.on("dialog", lambda d: d.dismiss())
    pg2.locator("#cotiza").scroll_into_view_if_needed()
    pg2.wait_for_timeout(500)
    pg2.locator(".cq-submit").click()
    pg2.wait_for_timeout(400)
    ok("sin destino no manda nada", pg2.evaluate("window.__wa") is None,
       pg2.evaluate("window.__wa"))
    ok("sin destino tampoco cuenta una consulta",
       "enviar_cotizacion" not in nombres(pg2), nombres(pg2))

    print()
    print("LAS PÁGINAS DE DESTINO (llevan el mismo formulario)")
    for slug in ["disney-orlando", "universal-orlando", "cruceros-disney", "disneyland-paris"]:
        pg3 = ctx.new_page()
        err3 = []
        pg3.on("pageerror", lambda e: err3.append(str(e)))
        correr(pg3, uri(slug))
        pg3.locator("#form-cotiza").scroll_into_view_if_needed()
        pg3.wait_for_timeout(700)
        ok("/%s/ tiene el formulario y lo mide" % slug,
           pg3.locator(".cq-dest-btn").count() == 3
           and "ver_formulario" in nombres(pg3) and not err3,
           (pg3.locator(".cq-dest-btn").count(), nombres(pg3), err3))
        pg3.close()

    nav.close()

print()
print("FALLAS: " + (", ".join(fallos) if fallos else "ninguna"))
sys.exit(1 if fallos else 0)
