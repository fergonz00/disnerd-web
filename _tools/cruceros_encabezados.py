# -*- coding: utf-8 -*-
"""Saca el puerto y el barco de cada pagina del flyer de itinerarios.

Los dos estan como IMAGEN en el encabezado -el puerto resaltado en la barra
de arriba, el barco como logo-, asi que no salen con extract_text(). Esto
parte el PDF en una hoja por pagina, las abre en el Chrome de Claude y arma
una tira con los 15 encabezados para leerlos a ojo.

    python _tools/cruceros_encabezados.py <ruta-del-pdf>

Lo que se lee de ahi se carga a mano en la tabla PAGINA de cruceros_armar.py.
"""
import pathlib
import sys

import pypdf
from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")
pdf = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "itinerarios.pdf").resolve()
D = pdf.parent

r = pypdf.PdfReader(str(pdf))
for i, pg in enumerate(r.pages, 1):
    w = pypdf.PdfWriter()
    w.add_page(pg)
    with open(D / ("sola%02d.pdf" % i), "wb") as f:
        w.write(f)
print("  %d paginas sueltas" % len(r.pages))

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://127.0.0.1:9340")
    pg = b.contexts[0].new_page()
    pg.set_viewport_size({"width": 1250, "height": 950})
    for i in range(1, len(r.pages) + 1):
        pg.goto((D / ("sola%02d.pdf" % i)).as_uri())
        pg.wait_for_timeout(2300)
        pg.screenshot(path=str(D / ("h%02d.png" % i)),
                      clip={"x": 170, "y": 55, "width": 980, "height": 175})
    pg.close()

W, H = 840, 140
hoja = Image.new("RGB", (W, H * len(r.pages)), (255, 255, 255))
d = ImageDraw.Draw(hoja)
try:
    tipo = ImageFont.truetype("arialbd.ttf", 20)
except Exception:
    tipo = ImageFont.load_default()
for i in range(len(r.pages)):
    im = Image.open(D / ("h%02d.png" % (i + 1)))
    im = im.resize((W - 38, int(im.height * (W - 38) / im.width)), Image.LANCZOS)
    hoja.paste(im.crop((0, 0, W - 38, H)), (38, i * H))
    d.text((2, i * H + 55), "p%d" % (i + 1), fill=(200, 0, 0), font=tipo)
hoja.save(D / "ENCABEZADOS.jpg", quality=90)
print("  -> %s" % (D / "ENCABEZADOS.jpg"))
