# -*- coding: utf-8 -*-
"""Las fotos del viaje de Tupi, enteras, para cuando alguien las agranda.

En la tarjeta se ve un cuadrado; al tocarla tiene que verse la foto completa,
no el recorte. Esto genera esa version grande a partir del original que mando
Sofi.
"""
import pathlib
import sys

from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")
ORIG = pathlib.Path(r"C:\Users\FSCHNE~1\AppData\Local\Temp\claude\c--proyectos"
                    r"\037c376a-961a-462a-b660-24bbc7f7f1b9\scratchpad\canje")
R = pathlib.Path(r"C:\proyectos\disnerd-web\resenas")

# el mismo orden que foto-tupi-1..5
FUENTES = [
    ("WhatsApp Image 2026-10-15 at 12.34.56.jpeg", 1),
    ("WhatsApp Image 2026-10-15 at 12.34.56 (1).jpeg", 2),
    ("WhatsApp Image 2026-10-15 at 12.34.57.jpeg", 3),
    ("WhatsApp Image 2026-10-15 at 12.34.57 (1).jpeg", 4),
    ("WhatsApp Image 2026-10-15 at 12.34.57 (2).jpeg", 5),
]
ANCHO = 900

for archivo, n in FUENTES:
    ruta = ORIG / archivo
    if not ruta.exists():
        print("  falta el original de la %d, se deja la que hay" % n)
        continue
    im = Image.open(ruta).convert("RGB")
    alto = round(im.height * ANCHO / im.width)
    destino = R / ("grande-tupi-%d.webp" % n)
    im.resize((ANCHO, alto), Image.LANCZOS).save(destino, "WEBP", quality=80, method=6)
    print("  grande-tupi-%d  %dx%d  %3.0f KB" % (n, ANCHO, alto, destino.stat().st_size / 1024))
