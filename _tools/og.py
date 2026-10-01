# -*- coding: utf-8 -*-
"""Arma las imagenes de previsualizacion (las que muestra WhatsApp, Instagram o
Facebook cuando alguien comparte un link) y el icono de la pestana.

Se renderiza HTML con las fuentes y colores del sitio, asi las tarjetas salen
con la misma estetica que la pagina.

    python _tools/og.py            -> deja todo en _muestras/og para revisar
    python _tools/og.py --publicar -> las escribe en og/ y la raiz, listas para subir

Necesita el sitio servido en local:  python -m http.server 8765
"""
from playwright.sync_api import sync_playwright
from PIL import Image
import os, sys, shutil

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = "http://127.0.0.1:8765"
PUBLICAR = "--publicar" in sys.argv
DESTINO = os.path.join(RAIZ, "og") if PUBLICAR else os.path.join(RAIZ, "_muestras", "og")

HOGWARTS = B + "/_muestras/WhatsApp%20Image%202026-09-30%20at%2017.43.22%20(1).jpeg"

TARJETAS = [
    dict(archivo="og-home.jpg", foto=B + "/foto-04.webp", tam=56,
         titulo="Tu viaje a <em>Disney</em>,<br>armado a tu medida",
         bajada="Orlando, California, París y cruceros Disney. Asesoramiento y gestión sin cargo, desde cualquier país.",
         pie="Agente top seller · Disney y Universal"),
    dict(archivo="og-personaje.jpg", foto=B + "/foto-12.webp", tam=54,
         titulo="¿Qué <em>personaje</em><br>de Disney sos?",
         bajada="Cuatro tests: princesas, villanos, clásicos y Pixar. Doce preguntas nada obvias cada uno.",
         pie="Tests gratis · disnerd.com.ar"),
    dict(archivo="og-princesas.jpg", foto=B + "/foto-02.webp", tam=54,
         titulo="¿Qué <em>princesa</em><br>de Disney sos?",
         bajada="Quince princesas, de Blancanieves a Raya. La magia decide sola.",
         pie="Test gratis · disnerd.com.ar"),
    dict(archivo="og-villanos.jpg", foto=B + "/foto-08.webp", tam=54,
         titulo="¿Qué <em>villano</em><br>de Disney sos?",
         bajada="Catorce villanos de Disney y Pixar. Contestá sin culpa: acá nadie juzga.",
         pie="Test gratis · disnerd.com.ar"),
    dict(archivo="og-clasicos.jpg", foto=B + "/foto-09.webp", tam=52,
         titulo="¿Qué <em>personaje</em> de<br>Disney llevás adentro?",
         bajada="Ni princesas ni villanos: los de siempre. Mickey, Stitch, Olaf y quince más.",
         pie="Test gratis · disnerd.com.ar"),
    dict(archivo="og-pixar.jpg", foto=B + "/foto-10.webp", tam=54,
         titulo="¿Qué personaje<br>de <em>Pixar</em> sos?",
         bajada="De Toy Story a Intensa-Mente. Dieciséis personajes y preguntas que no se ven venir.",
         pie="Test gratis · disnerd.com.ar"),
    dict(archivo="og-sombrero.jpg", foto=HOGWARTS, tam=52,
         titulo="El <em>Sombrero</em><br>Seleccionador",
         bajada="¿De qué casa de Hogwarts sos? Y si el Sombrero duda entre dos, te deja elegir.",
         pie="Test de fans · disnerd.com.ar"),
    dict(archivo="og-disney-orlando.jpg", foto=B + "/foto-11.webp", tam=52,
         titulo="Viajes a <em>Disney</em><br>Orlando",
         bajada="Presupuestos reales con precios en dólares: hotel, entradas y plan de comidas.",
         pie="Precios reales · disnerd.com.ar"),
    dict(archivo="og-universal-orlando.jpg", foto=B + "/foto-08.webp", tam=52,
         titulo="Viajes a <em>Universal</em><br>Orlando",
         bajada="Presupuestos reales, con los hoteles nuevos cerca de Epic Universe.",
         pie="Precios reales · disnerd.com.ar"),
    dict(archivo="og-cruceros-disney.jpg", foto=B + "/foto-05.webp", tam=54,
         titulo="<em>Cruceros</em><br>Disney",
         bajada="Casi todo incluido. Presupuestos reales con el precio de cada camarote.",
         pie="Precios reales · disnerd.com.ar"),
    dict(archivo="og-disneyland-paris.jpg", foto=B + "/foto-06.webp", tam=52,
         titulo="Viajes a <em>Disneyland</em><br>París",
         bajada="La opción más corta y económica para conocer un parque Disney.",
         pie="Precios reales · disnerd.com.ar"),
]

PLANTILLA = """<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
 * { margin:0; padding:0; box-sizing:border-box; }
 body { width:1200px; height:630px; display:flex; background:#faf8f4;
        font-family:'Raleway',sans-serif; overflow:hidden; }
 .txt { flex:1.15; padding:64px 56px; display:flex; flex-direction:column; justify-content:center; }
 .marca { font-family:'Playfair Display',serif; font-style:italic; font-size:34px; color:#2c2825; }
 .marca span { display:block; font-family:'Raleway',sans-serif; font-style:normal; font-size:13px;
               letter-spacing:.2em; text-transform:uppercase; color:#9e9189; margin-top:2px; }
 h1 { font-family:'Playfair Display',serif; font-weight:400; font-size:__TAM__px; line-height:1.1;
      color:#2c2825; margin:36px 0 18px; }
 h1 em { font-style:italic; color:#7ab5cc; }
 p { font-size:20px; line-height:1.5; color:#6b6259; font-weight:300; max-width:520px; }
 .pie { margin-top:38px; font-size:14px; letter-spacing:.14em; text-transform:uppercase;
        color:#7ab5cc; font-weight:600; }
 .foto { flex:1; background:url('__FOTO__') center/cover; position:relative; }
 .foto::after { content:''; position:absolute; inset:0;
                background:linear-gradient(90deg,#faf8f4 0%,rgba(250,248,244,0) 32%); }
</style></head><body>
 <div class="txt">
   <div class="marca">Disnerd<span>Sofi Valle Mayorga</span></div>
   <h1>__TITULO__</h1>
   <p>__BAJADA__</p>
   <div class="pie">__PIE__</div>
 </div>
 <div class="foto"></div>
</body></html>"""

ICONO = """<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600&display=swap" rel="stylesheet">
<style>
 * { margin:0; padding:0; }
 body { width:512px; height:512px; background:#7ab5cc; display:flex;
        align-items:center; justify-content:center; }
 span { font-family:'Playfair Display',serif; font-style:italic; font-weight:600;
        font-size:340px; color:#faf8f4; line-height:1; margin-top:-24px; }
</style></head><body><span>D</span></body></html>"""


def main():
    os.makedirs(DESTINO, exist_ok=True)
    with sync_playwright() as p:
        nav = p.chromium.launch()
        pg = nav.new_context(viewport={"width": 1200, "height": 630}).new_page()
        for t in TARJETAS:
            html = (PLANTILLA.replace("__TAM__", str(t["tam"])).replace("__FOTO__", t["foto"])
                    .replace("__TITULO__", t["titulo"]).replace("__BAJADA__", t["bajada"])
                    .replace("__PIE__", t["pie"]))
            pg.set_content(html, wait_until="load")
            pg.wait_for_timeout(1500)                    # que carguen fuentes y foto
            vacia = pg.evaluate("() => !getComputedStyle(document.querySelector('.foto')).backgroundImage.includes('url(')")
            if vacia:
                raise SystemExit("No cargo la foto de " + t["archivo"] + ": " + t["foto"])
            tmp = os.path.join(DESTINO, t["archivo"].replace(".jpg", ".png"))
            pg.screenshot(path=tmp)
            Image.open(tmp).convert("RGB").save(os.path.join(DESTINO, t["archivo"]),
                                                "JPEG", quality=86, optimize=True, progressive=True)
            os.remove(tmp)
            print("  %-20s %5.0f KB" % (t["archivo"], os.path.getsize(os.path.join(DESTINO, t["archivo"])) / 1024))

        # icono de la pestana
        pgi = nav.new_context(viewport={"width": 512, "height": 512}).new_page()
        pgi.set_content(ICONO, wait_until="load")
        pgi.wait_for_timeout(1200)
        base = os.path.join(DESTINO, "icono-512.png")
        pgi.screenshot(path=base)
        im = Image.open(base).convert("RGB")
        raiz_iconos = RAIZ if PUBLICAR else DESTINO
        im.resize((180, 180), Image.LANCZOS).save(os.path.join(raiz_iconos, "apple-touch-icon.png"))
        im.resize((32, 32), Image.LANCZOS).save(os.path.join(raiz_iconos, "favicon.ico"),
                                                sizes=[(16, 16), (32, 32), (48, 48)])
        print("  favicon.ico y apple-touch-icon.png")
        nav.close()
    print()
    print("quedaron en:", DESTINO)


if __name__ == "__main__":
    main()
