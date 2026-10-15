# -*- coding: utf-8 -*-
"""Las capturas en cuadrado, recortadas con criterio.

Dejarselo al CSS cortaba frases por la mitad. Aca se elige la franja mirando
cada una: Tupi arriba (se ve el usuario y el texto de la historia), Gaston abajo
medio y Agustina al final, que es donde cada mensaje entra entero. La de Jaz
es apaisada y no se recorta: va centrada sobre blanco, el mismo blanco de la
tarjeta, asi no se pierde una sola palabra.

La tarjeta usa este cuadrado; la lupa sigue abriendo la captura original.
"""
import pathlib
import sys

from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")
R = pathlib.Path(r"C:\proyectos\disnerd-web\resenas")

# la segunda historia de Tupi muestra el chat del grupo del viaje: el recorte
# arranca en 0.29 para que entren su usuario verificado, el texto donde nombra
# a Sofi y la charla casi entera
ELEGIDAS = {"tupi": 0.00, "tupi-charla": 0.29, "gaston": 0.78,
            "agustina": 1.00, "jaz": None}
LADO = 760

for nombre, pos in ELEGIDAS.items():
    im = Image.open(R / ("resena-%s.jpg" % nombre)).convert("RGB")
    if pos is None:
        cuad = Image.new("RGB", (im.width, im.width), (255, 255, 255))
        cuad.paste(im, (0, (im.width - im.height) // 2))
        nota = "entera sobre blanco"
    else:
        lado = im.width
        y = int((im.height - lado) * pos)
        cuad = im.crop((0, y, lado, y + lado))
        nota = "recorte al %d%%" % (pos * 100)
    destino = R / ("tarjeta-%s.webp" % nombre)
    cuad.resize((LADO, LADO), Image.LANCZOS).save(destino, "WEBP", quality=82, method=6)
    print("  tarjeta-%-9s %-20s %4.0f KB" % (nombre, nota, destino.stat().st_size / 1024))

# ── La lupa de la historia de Tupi ──
# Su captura es una historia de 900x1600 con el chat adentro: en un celular
# entra a 342 px de ancho, o sea a escala 0,38, y la conversacion no se lee.
# Asi que al agrandarla no se abre la historia entera sino la conversacion
# sola, que a esa misma pantalla entra casi a tamanio real.
CHAT = (263, 420, 640, 1175)
im = Image.open(R / "resena-tupi-charla.jpg").convert("RGB")
c = im.crop(CHAT)
destino = R / "lupa-tupi-charla.webp"
c.resize((c.width * 2, c.height * 2), Image.LANCZOS).save(
    destino, "WEBP", quality=85, method=6)
print("  lupa-tupi-charla  la conversacion sola, %dx%d  %3.0f KB"
      % (c.width * 2, c.height * 2, destino.stat().st_size / 1024))
