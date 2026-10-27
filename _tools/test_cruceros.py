# -*- coding: utf-8 -*-
"""Prueba el catalogo de rutas de cruceros y sus filtros.

    python _tools/test_cruceros.py
    DISNERD_BASE=https://disnerd.com.ar python _tools/test_cruceros.py
"""
import os
import pathlib
import sys

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = pathlib.Path(__file__).resolve().parent.parent
BASE = os.environ.get("DISNERD_BASE", "")

ESPIA = """
window.__wa = null;
window.dataLayer = window.dataLayer || [];
window.open = function (u) { window.__wa = u; return null; };
"""
LEER = """() => (window.dataLayer || []).filter(a => a[0] === 'event').map(a => [a[1], a[2] || {}])"""

fallos = []


def ok(desc, cond, detalle=""):
    print(("  OK    " if cond else "  FALLA") + "  " + desc +
          ("" if cond else "  -> " + str(detalle)))
    if not cond:
        fallos.append(desc)


def uri():
    if BASE:
        return BASE.rstrip("/") + "/cruceros-disney/"
    return (RAIZ / "cruceros-disney" / "index.html").as_uri()


with sync_playwright() as p:
    nav = p.chromium.launch()
    ctx = nav.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
    pg = ctx.new_page()
    errores = []
    pg.on("pageerror", lambda e: errores.append(str(e)))
    pg.route("**/googletagmanager.com/**", lambda r: r.abort())
    pg.add_init_script(ESPIA)
    pg.goto(uri())
    pg.wait_for_timeout(1200)

    total = pg.locator(".cru").count()
    ok("el catálogo se dibuja", total > 25, total)

    # Lo que importa desde que se saco el dataset del sitemap: una ficha sin
    # salidas publicadas NO puede afirmar barco ni duracion.
    # f:0 es "solo sé el destino": no puede traer barco ni un número de noches.
    inventa = pg.evaluate("""() => RUTAS.filter(x => x.f === 0 && ((x.b||[]).length || String(x.n).match(/^[0-9]+$/)))
                                        .map(x => x.d)""")
    ok("lo que no tiene fuente no inventa barco ni noches", not inventa, inventa)
    # y nada puede quedar sin nivel de respaldo
    sinf = pg.evaluate("RUTAS.filter(x => ![0,1,2].includes(x.f)).map(x => x.d)")
    ok("toda ficha declara de dónde salió el dato", not sinf, sinf)
    conFechas = pg.evaluate("RUTAS.filter(x => x.f && x.sal > 0).length")
    ok("la mayoría trae salidas reales del calendario de Disney", conFechas >= 40, conFechas)
    salidas = pg.evaluate("RUTAS.reduce((a, x) => a + (x.sal || 0), 0)")
    ok("suman cientos de salidas", salidas > 250, salidas)
    # una ficha sin salidas no puede mostrar la linea de salidas
    malas = pg.evaluate("""() => [...document.querySelectorAll('.cru')]
        .filter(c => c.querySelector('.cru-sal') && !c.querySelector('.cru-sal').innerText.trim()).length""")
    ok("no hay línea de salidas vacía", malas == 0, malas)
    ok("están los 14 destinos en el filtro",
       pg.locator("#cru-f-r .pr-chip").count() == 15, pg.locator("#cru-f-r .pr-chip").count())

    # noches, barco y puerto van plegados: cuatro grupos de chips se comian dos
    # pantallas de celular. Se abren para probarlos.
    ok("los filtros de más están plegados",
       not pg.locator("#cru-f-n .pr-chip").first.is_visible())
    pg.locator(".cru-mas summary").click()
    pg.wait_for_timeout(300)
    ok("y se abren al tocarlos", pg.locator("#cru-f-n .pr-chip").first.is_visible())

    # el filtro de noches solo ofrece numeros: "7 a 8" confundiria al lado de "7 noches"
    noches = [t.strip() for t in pg.locator("#cru-f-n .pr-chip").all_text_contents()]
    ok("el filtro de noches sólo ofrece números",
       all(n == "Todos" or n.split()[0].isdigit() for n in noches), noches)

    pg.locator('#cru-f-r .pr-chip[data-v="europa"]').click()
    pg.wait_for_timeout(350)
    eu = pg.locator(".cru").count()
    ok("filtrar por Europa deja menos y más de cero", 0 < eu < total, eu)
    ok("el contador lo dice", "de %d" % total in pg.locator("#cru-cuenta").text_content(),
       pg.locator("#cru-cuenta").text_content())

    pg.locator('#cru-f-n .pr-chip').nth(1).click()
    pg.wait_for_timeout(350)
    ok("sumar las noches afina todavía más", pg.locator(".cru").count() < eu,
       pg.locator(".cru").count())

    # una combinacion imposible tiene que avisar, no quedar en blanco
    pg.locator('#cru-f-r .pr-chip[data-v="alaska"]').click()
    pg.wait_for_timeout(350)
    ok("una combinación sin rutas avisa y ofrece preguntar",
       pg.locator(".pr-vacio").count() == 1 and pg.locator(".cru").count() == 0,
       (pg.locator(".pr-vacio").count(), pg.locator(".cru").count()))

    pg.locator('#cru-f-r .pr-chip[data-v=""]').click()
    pg.locator('#cru-f-n .pr-chip[data-v=""]').click()
    pg.wait_for_timeout(350)
    ok("volver a Todos muestra todas otra vez", pg.locator(".cru").count() == total)

    ev = [n for n, d in pg.evaluate(LEER)]
    ok("filtrar se mide", "filtrar_cruceros" in ev, ev)

    # el boton tiene que llevar a WhatsApp con la ruta ya escrita
    cta = pg.locator(".cru-cta").first
    href = cta.get_attribute("href") or ""
    ok("cada ruta abre WhatsApp con el mensaje armado",
       href.startswith("https://wa.me/5491132924274?text=") and "crucero" in href, href[:80])

    # y NO puede haber precios: el catalogo es sin precio a proposito
    txt = pg.locator("#cru-lista").inner_text()
    ok("el catálogo no muestra precios", "USD" not in txt and "$" not in txt,
       [l for l in txt.splitlines() if "USD" in l or "$" in l][:3])

    ok("los presupuestos con precio siguen estando aparte",
       pg.locator("#pr-lista .pr").count() > 0, pg.locator("#pr-lista .pr").count())

    ok("no hay scroll horizontal",
       not pg.evaluate("document.documentElement.scrollWidth > window.innerWidth"))
    ok("sin errores de javascript", not errores, errores)

    nav.close()

print()
print("FALLAS: " + (", ".join(fallos) if fallos else "ninguna"))
sys.exit(1 if fallos else 0)
