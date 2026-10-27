# -*- coding: utf-8 -*-
"""Saca los itinerarios del PDF oficial de Disney para agentes.

Fuente: disneytravelagents.com -> Disney Cruise Line -> Destinations ->
"View a flyer showing an itinerary overview", temporada otoño 2027 y
primavera 2028. El PDF lo aclara en cada pagina: "Itineraries and sail dates
are subject to change. Port order may vary."

Cada fila del PDF trae: itinerario (con las noches), puertos de escala y las
fechas de salida.
"""
import json
import pathlib
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
AQUI = pathlib.Path(__file__).resolve().parent

MESES = {"JAN": 1, "FEB": 2, "MARCH": 3, "MAR": 3, "APRIL": 4, "APR": 4, "MAY": 5,
         "JUNE": 6, "JUN": 6, "JULY": 7, "JUL": 7, "AUG": 8, "SEPT": 9, "SEP": 9,
         "OCT": 10, "NOV": 11, "DEC": 12}
ES = {1: "enero", 2: "febrero", 3: "marzo", 4: "abril", 5: "mayo", 6: "junio",
      7: "julio", 8: "agosto", 9: "septiembre", 10: "octubre", 11: "noviembre",
      12: "diciembre"}


def fechas(txt):
    """'2027: SEPT. 10, 17 • OCT. 1   2028: JAN. 7' -> [(2027,9,10), ...]"""
    out = []
    for anio_s, cuerpo in re.findall(r"(20\d\d):\s*([^2]*(?:2(?!0\d\d:)[^2]*)*)", txt):
        anio = int(anio_s)
        mes = None
        for tok in re.findall(r"([A-Z]{3,5})\.?|(\d{1,2})", cuerpo):
            if tok[0]:
                mes = MESES.get(tok[0].upper())
            elif tok[1] and mes:
                out.append((anio, mes, int(tok[1])))
    return out


def limpiar(s):
    return re.sub(r"\s+", " ", s).strip(" •·-")


filas = []
paginas = (AQUI / "texto.txt").read_text(encoding="utf-8").split("\x0c")
for npag, t in enumerate(paginas, 1):
    plano = re.sub(r"\s*\n\s*", " ", t)
    # cada itinerario arranca en "N-Night"
    trozos = re.split(r"(?=\b\d+-Night\b)", plano)
    for tr in trozos:
        m = re.match(r"(\d+)-Night\s+(.*)", tr, re.S)
        if not m:
            continue
        noches = int(m.group(1))
        resto = m.group(2)
        # el nombre llega hasta "Cruise"; despues vienen escalas y fechas
        mc = re.search(r"\bCruise\b", resto)
        if not mc:
            continue
        nombre = limpiar(resto[:mc.end()])
        cola = resto[mc.end():]
        mf = re.search(r"20\d\d\s*:", cola)
        escalas = limpiar(cola[:mf.start()]) if mf else ""
        fs = fechas(cola[mf.start():]) if mf else []
        if not fs:
            continue
        # el puerto, solo si el propio nombre lo dice: no se adivina
        mp = re.search(r"\bfrom ([A-Z][A-Za-z .]+?)(?:\s+ending in\s+([A-Z][A-Za-z .]+))?$", nombre)
        filas.append({
            "pag": npag, "noches": noches, "nombre": nombre,
            "sale": limpiar(mp.group(1)) if mp else "",
            "termina": limpiar(mp.group(2)) if (mp and mp.group(2)) else "",
            "escalas": escalas[:200], "fechas": fs,
        })

print("  %d itinerarios con fecha" % len(filas))
print("  %d salidas en total" % sum(len(f["fechas"]) for f in filas))
anios = sorted({a for f in filas for a, _, _ in f["fechas"]})
print("  anios:", anios)
ms = sorted({(a, m) for f in filas for a, m, _ in f["fechas"]})
print("  de %s %d a %s %d" % (ES[ms[0][1]], ms[0][0], ES[ms[-1][1]], ms[-1][0]))
print()
for f in filas[:12]:
    print("   %2dn %-58s %2d salidas  %s" % (f["noches"], f["nombre"][:58], len(f["fechas"]),
                                             f["escalas"][:40]))
(AQUI / "itinerarios.json").write_text(json.dumps(filas, ensure_ascii=False, indent=1),
                                       encoding="utf-8")
print("\n  -> itinerarios.json")
