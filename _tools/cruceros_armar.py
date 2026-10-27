# -*- coding: utf-8 -*-
"""Arma el catalogo para la web desde los itinerarios del PDF oficial.

Agrupa las salidas repetidas: "3-Night Bahamian" con 18 fechas es UNA ficha
con 18 fechas, no 18 fichas.

El puerto de salida se toma solo cuando Disney lo dice -en el nombre del
itinerario o en el encabezado de la pagina-, nunca por deduccion. Si no
consta, va vacio.
"""
import json
import pathlib
import re
import sys
from collections import defaultdict

sys.stdout.reconfigure(encoding="utf-8")
AQUI = pathlib.Path(__file__).resolve().parent

# paginas cuyo encabezado declara el puerto, textual
PUERTO_PAG = {1: "Port Canaveral", 2: "Port Canaveral", 5: "Port Canaveral",
              7: "Fort Lauderdale", 11: "San Diego", 12: "San Diego",
              15: "Singapur"}

REGION = [
    ("Bahamian", "bahamas", "Bahamas", "\U0001F3DD️"),
    ("Western Caribbean", "caribe", "Caribe occidental", "\U0001F334"),
    ("Eastern Caribbean", "caribe", "Caribe oriental", "\U0001F334"),
    ("Southern Caribbean", "caribe", "Caribe sur", "\U0001F334"),
    ("Caribbean", "caribe", "Caribe", "\U0001F334"),
    ("Alaskan", "alaska", "Alaska", "\U0001F3D4️"),
    ("Bermuda", "bermuda", "Bermuda", "\U0001F420"),
    ("Baja", "mexico", "Baja California", "\U0001F335"),
    ("Mexican Riviera", "mexico", "Riviera Mexicana", "\U0001F32E"),
    ("Panama Canal", "panama", "Canal de Panamá", "⚓"),
    ("Pacific Coast", "pacifico-costa", "Costa del Pacífico", "\U0001F332"),
    ("Transatlantic", "transatlantico", "Transatlántico", "\U0001F30A"),
    ("Mediterranean", "europa", "Mediterráneo", "\U0001F3DB️"),
    ("Norwegian Fjords", "europa", "Fiordos Noruegos", "⛰️"),
    ("British Isles", "europa", "Islas Británicas", "\U0001FAD6"),
    ("Northern Europe", "europa", "Europa del Norte", "⛵"),
    ("Europe", "europa", "Europa", "⛵"),
    ("Canada", "canada", "Canadá", "\U0001F341"),
    ("Hawaii", "hawai", "Hawái", "\U0001F33A"),
    ("Hawaiian", "hawai", "Hawái", "\U0001F33A"),
    ("Southeast Asia", "singapur", "Sudeste asiático", "\U0001F3D9️"),
    ("Singapore", "singapur", "Singapur", "\U0001F3D9️"),
    ("South Pacific", "pacifico", "Pacífico Sur", "\U0001F41A"),
]
TEMA = [("Halloween on the High Seas", "halloween", "\U0001F383 Halloween"),
        ("Very Merrytime", "navidad", "\U0001F384 Navidad"),
        ("Marvel", "marvel", "\U0001F9B8 Marvel"),
        ("Pixar", "pixar", "\U0001F388 Pixar")]
ES = {1: "ene", 2: "feb", 3: "mar", 4: "abr", 5: "may", 6: "jun",
      7: "jul", 8: "ago", 9: "sep", 10: "oct", 11: "nov", 12: "dic"}

datos = json.loads((AQUI / "itinerarios.json").read_text(encoding="utf-8"))

grupos = defaultdict(lambda: {"fechas": set(), "escalas": set(), "pags": set()})
sin_region = set()
for it in datos:
    n = it["nombre"]
    reg = lindo = emoji = None
    for clave, r, l, e in REGION:
        if clave.lower() in n.lower():
            reg, lindo, emoji = r, l, e
            break
    if not reg:
        sin_region.add(n)
        continue
    tema = temaTxt = ""
    for clave, slug, txt in TEMA:
        if clave.lower() in n.lower():
            tema, temaTxt = slug, txt
            break
    puerto = it["sale"] or PUERTO_PAG.get(it["pag"], "")
    # El puerto NO entra en la clave: el PDF solo lo declara en algunas
    # paginas y si no, la misma ruta quedaba partida en dos fichas gemelas.
    k = (reg, lindo, emoji, it["noches"], tema, temaTxt)
    g = grupos[k]
    if puerto:
        g.setdefault("puertos", set()).add(puerto)
    if it["termina"]:
        g.setdefault("fin", set()).add(it["termina"])
    g["fechas"].update(tuple(f) for f in it["fechas"])
    if it["escalas"]:
        g["escalas"].add(it["escalas"])
    g["pags"].add(it["pag"])

if sin_region:
    print("  sin clasificar (%d):" % len(sin_region))
    for x in sorted(sin_region)[:8]:
        print("    - " + x[:70])

salida = []
for (reg, lindo, emoji, noches, tema, temaTxt), g in grupos.items():
    puerto = " o ".join(sorted(g.get("puertos", ())))
    termina = " o ".join(sorted(g.get("fin", ())))
    fs = sorted(g["fechas"])
    meses = sorted({(a, m) for a, m, _ in fs})
    salida.append({
        "r": reg, "d": lindo, "e": emoji, "n": noches, "s": puerto,
        "fin": termina, "t": tema, "tt": temaTxt,
        "x": max(g["escalas"], key=len)[:150] if g["escalas"] else "",
        "sal": len(fs),
        "meses": [ES[m] + " " + str(a)[2:] for a, m in meses],
        "desde": "%s %d" % (ES[meses[0][1]], meses[0][0]),
        "hasta": "%s %d" % (ES[meses[-1][1]], meses[-1][0]),
    })
salida.sort(key=lambda x: (x["r"], x["n"], x["t"]))

print()
print("  %d fichas, de %d itinerarios y %d salidas"
      % (len(salida), len(datos), sum(x["sal"] for x in salida)))
print("  regiones: %s" % ", ".join(sorted({x["r"] for x in salida})))
print()
for x in salida[:16]:
    print("   %-20s %2dn %-14s %-13s %2d salidas (%s a %s)"
          % (x["d"][:20], x["n"], x["tt"] or "", x["s"][:13], x["sal"], x["desde"], x["hasta"]))
(AQUI / "catalogo.json").write_text(json.dumps(salida, ensure_ascii=False, indent=1),
                                    encoding="utf-8")
print("\n  -> catalogo.json")
