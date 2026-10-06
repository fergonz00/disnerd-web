# -*- coding: utf-8 -*-
"""
Da de baja los presupuestos que ya vencieron y avisa a Fer por WhatsApp.

Un presupuesto vence el dia del CHECK IN (campo `vence` de presupuestos.js): a
partir de ahi ya no se puede vender y no puede seguir figurando en la web. Fer
lo pidio asi el 6-10-2026: "si ya pasamos la fecha de ese presupuesto, obvio
dalo de baja; no puede figurar algo del 2025 siendo 2026". El reemplazo se lo
pide el a Sofi, por eso el aviso avisa tambien los que estan por vencer.

    python vencidos.py            # corrida real (la que usa la tarea diaria)
    python vencidos.py --dry      # no toca nada ni avisa: solo cuenta que haria
    python vencidos.py --hoy 2027-01-05   # simula otro dia, para probar

Lo que saca queda en el historial de git, asi que volver atras es un `git revert`.
"""
import io
import os
import re
import subprocess
import sys
from datetime import date, timedelta

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS = os.path.join(REPO, "presupuestos.js")
INDEX = os.path.join(REPO, "index.html")
AVISAR_DESDE = 7          # dias de anticipacion para el "esta por vencer"
TOPE_BAJAS = 5            # mas que esto en un dia huele a fecha mal cargada: no toca nada

sys.path.insert(0, os.path.join("C:" + os.sep, "proyectos", "kavak-cotizador"))
import aviso  # noqa: E402

BLOQUE = re.compile(r"  \{\n    id: '(?P<id>[^']+)'.*?\n  \},?\n", re.S)


def leer(texto):
    """Cada presupuesto, con su bloque de texto tal cual esta en el archivo."""
    out = []
    for m in BLOQUE.finditer(texto):
        bloque = m.group(0)
        def campo(nombre):
            c = re.search(nombre + r": '([^']*)'", bloque)
            return c.group(1) if c else ""
        out.append({"id": m.group("id"), "bloque": bloque, "vence": campo("vence"),
                    "titulo": campo("titulo"), "fechas": campo("fechas")})
    return out


def git(*args):
    return subprocess.run(["git"] + list(args), cwd=REPO, capture_output=True,
                          text=True, encoding="utf-8", errors="replace")


def main():
    dry = "--dry" in sys.argv
    hoy = date.today()
    if "--hoy" in sys.argv:
        hoy = date.fromisoformat(sys.argv[sys.argv.index("--hoy") + 1])

    if not dry:
        git("pull", "--quiet", "--rebase")

    texto = io.open(JS, encoding="utf-8").read()
    presupuestos = leer(texto)
    sin_fecha = [p["id"] for p in presupuestos if not p["vence"]]

    vencidos = [p for p in presupuestos if p["vence"] and p["vence"] < hoy.isoformat()]
    limite = (hoy + timedelta(days=AVISAR_DESDE)).isoformat()
    porvencer = [p for p in presupuestos
                 if p["vence"] and hoy.isoformat() <= p["vence"] <= limite]

    hecho, detalle, mirar = [], [], []

    freno = len(vencidos) > TOPE_BAJAS
    if freno:
        # Freno de mano: antes de borrar media web, que lo mire una persona.
        mirar.append("%d presupuestos figuran vencidos de golpe — no di de baja ninguno, "
                     "revisa que las fechas esten bien cargadas" % len(vencidos))
        vencidos = []

    if sin_fecha:
        mirar.append("sin fecha de vencimiento cargada: " + ", ".join(sin_fecha))

    if vencidos and not dry:
        nuevo = texto
        for p in vencidos:
            nuevo = nuevo.replace(p["bloque"], "")
        io.open(JS, "w", encoding="utf-8", newline="").write(nuevo)

        quedan = len(presupuestos) - len(vencidos)
        html = io.open(INDEX, encoding="utf-8").read()
        html2 = re.sub(r"(⭐ )\d+( presupuestos reales)", r"\g<1>%d\g<2>" % quedan, html)
        if html2 != html:
            io.open(INDEX, "w", encoding="utf-8", newline="").write(html2)

        git("add", "presupuestos.js", "index.html")
        msj = "Doy de baja %d presupuesto%s vencido%s: %s" % (
            len(vencidos), "" if len(vencidos) == 1 else "s", "" if len(vencidos) == 1 else "s",
            ", ".join(p["id"] for p in vencidos))
        git("-c", "user.name=fergonz00", "-c", "user.email=fer_gonzalez88@hotmail.com",
            "commit", "--quiet", "-m", msj)
        push = git("push", "--quiet")
        if push.returncode != 0:
            mirar.append("no pude pushear la baja a GitHub: " + (push.stderr or "").strip()[:120])

    for p in vencidos:
        hecho.append("saque «%s» (%s)" % (p["titulo"], p["fechas"]))
    for p in porvencer:
        mirar.append("«%s» vence el %s — pedile el reemplazo a Sofi" % (p["titulo"], p["vence"]))

    quedan = len(presupuestos) - len(vencidos)
    detalle.append("quedan %d presupuestos publicados" % quedan)

    # El silencio no puede significar "todo bien": el dia 1 avisa aunque no haya novedad.
    novedad = bool(hecho or mirar) or hoy.day == 1
    print(("[dry] " if dry else "") + "hoy=%s bajas=%d porvencer=%d quedan=%d aviso=%s%s"
          % (hoy, len(vencidos), len(porvencer), quedan, novedad,
             " FRENO (demasiados vencidos juntos)" if freno else ""))
    if novedad and not dry:
        print(aviso.resultado("los presupuestos de la web de Sofi", hecho, detalle, mirar))


if __name__ == "__main__":
    main()
