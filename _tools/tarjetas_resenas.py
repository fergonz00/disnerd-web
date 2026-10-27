# -*- coding: utf-8 -*-
"""Las capturas en cuadrado, recortadas con criterio.

Dejarselo al CSS cortaba frases por la mitad. Aca se elige la franja mirando
cada una: Tupi arriba (se ve el usuario y el texto de la historia), Gaston abajo
medio y Agustina al final, que es donde cada mensaje entra entero. La de Jaz
es apaisada y no se recorta: va centrada sobre blanco, el mismo blanco de la
tarjeta, asi no se pierde una sola palabra. La del cumple es un collage con el
mensaje al pie, asi que tambien va al final.

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
            "agustina": 1.00, "jaz": None, "cumple": 1.00}
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
# Asi que al agrandarla no se abre la historia entera: se arma una imagen con
# quien es, lo que escribio y la conversacion, cada parte recortada y ampliada
# por separado. En el mismo celular el chat entra casi a tamanio real.
CABEZA = (112, 186, 505, 262)    # su foto, "tupisaravia" y el tilde de verificada
TEXTO = (225, 285, 675, 420)     # "@disnerd.sofi / ella nos organiza todo..."
CHAT = (263, 420, 640, 1175)     # la conversacion
ANCHO = 754                      # el doble del ancho del chat, para que se vea nitido
AIRE = 18                        # separacion, del color del fondo de la lupa
FONDO = (26, 24, 22)

im = Image.open(R / "resena-tupi-charla.jpg").convert("RGB")
partes = []
for caja in (CABEZA, TEXTO, CHAT):
    p = im.crop(caja)
    partes.append(p.resize((ANCHO, round(p.height * ANCHO / p.width)), Image.LANCZOS))

alto = sum(p.height for p in partes) + AIRE
hoja = Image.new("RGB", (ANCHO, alto), FONDO)
y = 0
for p in partes:
    hoja.paste(p, (0, y))
    y += p.height + AIRE

destino = R / "lupa-tupi-charla.webp"
hoja.save(destino, "WEBP", quality=85, method=6)
print("  lupa-tupi-charla  quien es + lo que escribio + la charla, %dx%d  %3.0f KB"
      % (ANCHO, alto, destino.stat().st_size / 1024))
