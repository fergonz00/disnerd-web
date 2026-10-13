# -*- coding: utf-8 -*-
"""
Chequea que los numeros de /cuanto-cuesta-ir-a-disney/ sigan coincidiendo con
presupuestos.js.

Esa pagina tiene los precios escritos en el HTML, que es lo que queriamos para
que Google los lea en la primera pasada. El riesgo es obvio: si entra o sale un
presupuesto y nadie toca la pagina, la pagina miente. Pasa solo, ademas: la
tarea de vencidos da de baja presupuestos sin que intervenga nadie.

    python precios_pagina.py          # dice si coincide; sale 1 si no
    python precios_pagina.py --detalle  # ademas imprime todos los numeros

NO reescribe la pagina a proposito. Cuando un numero cambia, muchas veces
cambia tambien la frase que lo rodea — si el mas barato deja de ser Paris, la
pagina no puede seguir diciendo "Paris parece el mas barato". Eso lo tiene que
mirar una persona. Esto avisa, no adivina.
"""
import io
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS = os.path.join(REPO, "presupuestos.js")
PAGINA = os.path.join(REPO, "cuanto-cuesta-ir-a-disney", "index.html")

NOMBRE = {"disney": "Disney Orlando", "universal": "Universal Orlando",
          "paris": "Disneyland Paris", "crucero": "Crucero Disney"}


def presupuestos():
    """Cada presupuesto con lo que hace falta para las cuentas de la pagina."""
    texto = io.open(JS, encoding="utf-8").read()
    out = []
    for bloque in re.split(r"\n  \{", texto):
        campo = lambda c: (re.search(c + r":\s*'([^']*)'", bloque) or [None, None])[1]
        destino = campo("destino")
        desde = re.search(r"desde:\s*(\d+)", bloque)
        if not (destino and desde):
            continue
        gente = campo("personas") or ""
        adultos = re.search(r"(\d+)", gente)
        menores = re.search(r"(\d+)\s*menor", gente)
        cuantos = (int(adultos.group(1)) if adultos else 1) + \
                  (int(menores.group(1)) if menores else 0)
        noches = re.search(r"(\d+)", campo("noches") or "1")
        noches = int(noches.group(1)) if noches else 1
        total = int(desde.group(1))
        out.append({"destino": destino, "titulo": campo("titulo"), "total": total,
                    "gente": gente, "cuantos": cuantos, "noches": noches,
                    "ppn": total / max(cuantos, 1) / max(noches, 1)})
    return out


def esperado(ps):
    """Los numeros que la pagina deberia estar diciendo hoy."""
    fam = [p for p in ps if p["destino"] == "disney" and "menor" in p["gente"]]
    # "en pareja o sola" = una o dos personas. Un grupo de 3 adultos no es eso.
    sin_chicos = [p for p in ps if p["destino"] == "disney" and p["cuantos"] <= 2]
    una_sola = [p for p in ps if p["destino"] == "disney" and p["cuantos"] == 1]
    e = {
        "cantidad": len(ps),
        "minimo": min(p["total"] for p in ps),
        "maximo": max(p["total"] for p in ps),
        "familia_min": min(p["ppn"] for p in fam) if fam else None,
        "una_sola": min(p["ppn"] for p in una_sola) if una_sola else None,
        "sin_chicos_min": min(p["ppn"] for p in sin_chicos) if sin_chicos else None,
        "sin_chicos_max": max(p["ppn"] for p in sin_chicos) if sin_chicos else None,
    }
    for d in NOMBRE:
        del_destino = [p for p in ps if p["destino"] == d]
        if del_destino:
            e["desde_" + d] = min(p["total"] for p in del_destino)
            e["ppn_min_" + d] = min(p["ppn"] for p in del_destino)
            e["ppn_max_" + d] = max(p["ppn"] for p in del_destino)
    return e


def miles(n):
    return format(int(n), ",").replace(",", ".")


def main():
    if not os.path.exists(PAGINA):
        print("no existe la pagina todavia: " + PAGINA)
        return 0
    ps = presupuestos()
    e = esperado(ps)
    html = io.open(PAGINA, encoding="utf-8").read()

    # Cada chequeo: que tiene que figurar en la pagina, y como se llama si falta.
    chequeos = [
        ("el rango de abajo (USD %s)" % miles(e["minimo"]), "USD " + miles(e["minimo"])),
        ("el rango de arriba (USD %s)" % miles(e["maximo"]), "USD " + miles(e["maximo"])),
        ("cuantos presupuestos son (%d)" % e["cantidad"], str(e["cantidad"]) + " presupuestos"),
    ]
    for d, nom in NOMBRE.items():
        if "desde_" + d in e:
            chequeos.append(("el desde de %s (USD %s)" % (nom, miles(e["desde_" + d])),
                             "USD " + miles(e["desde_" + d])))
    if e["familia_min"]:
        chequeos.append(("el por-persona-por-noche en familia (USD %d)" % e["familia_min"],
                         "USD %d" % e["familia_min"]))
    if e["una_sola"]:
        chequeos.append(("el por-persona-por-noche de la que viaja sola (USD %d)" % e["una_sola"],
                         "USD %d" % e["una_sola"]))
    if e["sin_chicos_min"]:
        chequeos.append(("el rango en pareja o sola (USD %d a %d)" % (
                             e["sin_chicos_min"], e["sin_chicos_max"]),
                         "USD %d a %d" % (e["sin_chicos_min"], e["sin_chicos_max"])))

    faltan = [nombre for nombre, aguja in chequeos if aguja not in html]

    if "--detalle" in sys.argv:
        print("PRESUPUESTOS (%d)" % len(ps))
        for p in sorted(ps, key=lambda x: (x["destino"], x["ppn"])):
            print("  %-13s %-38s USD %-7s %2d noc %d pers  %4d por persona por noche" % (
                NOMBRE.get(p["destino"], p["destino"]), (p["titulo"] or "")[:38],
                miles(p["total"]), p["noches"], p["cuantos"], p["ppn"]))
        print()
        for d, nom in NOMBRE.items():
            if "ppn_min_" + d in e:
                print("  %-20s desde USD %-7s  por persona por noche: USD %d a %d" % (
                    nom, miles(e["desde_" + d]), e["ppn_min_" + d], e["ppn_max_" + d]))
        print()

    if faltan:
        print("LA PAGINA DE PRECIOS QUEDO DESACTUALIZADA. No figura:")
        for f in faltan:
            print("   - " + f)
        print("Hay que revisarla a mano: cuando cambia un numero, muchas veces cambia")
        print("tambien la frase que lo rodea.")
        return 1

    print("la pagina de precios coincide con presupuestos.js (%d presupuestos)" % e["cantidad"])
    return 0


if __name__ == "__main__":
    sys.exit(main())
