# -*- coding: utf-8 -*-
"""Arma las páginas por destino: /disney-orlando/, /universal-orlando/,
/cruceros-disney/ y /disneyland-paris/.

Cada una muestra los presupuestos de ese destino ya desplegados, con su color,
y abajo el formulario por si quieren uno a medida. El contenido sale de
presupuestos.js: no hay nada escrito a mano dos veces.

Para volver a generarlas después de tocar los textos: python _tools/destinos.py
"""
import pathlib, sys
sys.stdout.reconfigure(encoding="utf-8")

RAIZ = pathlib.Path(__file__).resolve().parent.parent

DESTINOS = [
    dict(slug="disney-orlando", destino="disney",
         titulo="Viajes a Disney Orlando · Presupuestos reales con precios | Disnerd",
         desc="Presupuestos reales de viajes a Walt Disney World Orlando, con precios en dólares: "
              "hotel, entradas y plan de comidas. Armados para clientes, no estimaciones.",
         h1='Viajes a <em>Disney</em> Orlando',
         intro="Estos son presupuestos que armé para clientes de verdad, con los precios que "
               "pagaron. Te sirven para tener una idea concreta de cuánto sale, según cuántos "
               "sean y cuántas noches se queden.",
         emoji="🏰"),
    dict(slug="universal-orlando", destino="universal",
         titulo="Viajes a Universal Orlando · Presupuestos reales | Disnerd",
         desc="Presupuestos reales de viajes a Universal Orlando y Epic Universe, con precios "
              "en dólares: hotel y entradas a los parques. Armados para clientes.",
         h1='Viajes a <em>Universal</em> Orlando',
         intro="Presupuestos reales de Universal, con los precios que pagaron mis clientes. "
               "Incluye los hoteles nuevos cerca de Epic Universe.",
         emoji="🎢"),
    dict(slug="cruceros-disney", destino="crucero",
         titulo="Cruceros Disney · Presupuestos reales con precios | Disnerd",
         desc="Presupuestos reales de cruceros Disney desde Miami, con precios en dólares por "
              "tipo de camarote. Todo incluido salvo alcohol y propinas.",
         h1='<em>Cruceros</em> Disney',
         intro="En un crucero Disney está casi todo incluido: comidas, shows y actividades. "
               "Estos son presupuestos reales, con el precio de cada tipo de camarote.",
         emoji="🚢"),
    dict(slug="disneyland-paris", destino="paris",
         titulo="Viajes a Disneyland París · Presupuestos reales | Disnerd",
         desc="Presupuestos reales de viajes a Disneyland París, con precios en dólares: hotel, "
              "tickets con entrada ilimitada y planes de comida opcionales.",
         h1='Viajes a <em>Disneyland</em> París',
         intro="París es la opción más corta y más económica para conocer un parque Disney. "
               "Estos son presupuestos reales, con lo que pagaron mis clientes.",
         emoji="🥐"),
]

PLANTILLA = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>__TITULO__</title>
<meta name="description" content="__DESC__">
<link rel="canonical" href="https://disnerd.com.ar/__SLUG__/">
<meta name="robots" content="index, follow">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<meta property="og:title" content="__TITULO__">
<meta property="og:description" content="__DESC__">
<meta property="og:url" content="https://disnerd.com.ar/__SLUG__/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Disnerd">
<meta property="og:image" content="https://disnerd.com.ar/og/og-__SLUG__.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://disnerd.com.ar/og/og-__SLUG__.jpg">

<!-- Google tag (gtag.js) - Google Ads + GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18025415639"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18025415639');
  gtag('config', 'G-FP7MM2R3B7');
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/juegos.css">
<link rel="stylesheet" href="/presupuestos.css">
<link rel="stylesheet" href="/formulario.css">
<link rel="stylesheet" href="/wa-flotante.css">
<style>
  .dst { max-width: 820px; margin: 0 auto; padding: 0 1.2rem; }
  .dst-cab { text-align: center; padding: 1.4rem 0 2rem; }
  .dst-emoji { font-size: 2.6rem; line-height: 1; }
  .dst-cab h1 { font-family: 'Playfair Display', serif; font-size: 2.1rem; font-weight: 400;
                line-height: 1.15; margin: .7rem 0 .8rem; }
  .dst-cab h1 em { font-style: italic; color: var(--sky-soft); }
  .dst-cab p { font-size: .95rem; line-height: 1.65; color: var(--text-mid); max-width: 540px;
               margin: 0 auto; }
  .dst-sep { max-width: 820px; margin: 3rem auto 0; padding: 2.2rem 1.2rem 0;
             border-top: 1px solid var(--warm); text-align: center; }
  .dst-sep h2 { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 400;
                margin-bottom: .6rem; }
  .dst-sep h2 em { font-style: italic; color: var(--sky-soft); }
  .dst-sep p { font-size: .92rem; color: var(--text-mid); line-height: 1.6; max-width: 520px;
               margin: 0 auto 1.8rem; }
  .dst-otros { max-width: 820px; margin: 2.6rem auto 0; padding: 1.6rem 1.2rem 0;
               border-top: 1px solid var(--warm); }
  .dst-otros p { font-size: .78rem; color: var(--text-soft); text-align: center;
                 font-style: italic; font-family: 'Playfair Display', serif; margin-bottom: .8rem; }
  .dst-otros a { display: block; text-decoration: none; color: var(--text-mid); font-size: .88rem;
                 padding: .6rem .9rem; margin-bottom: .45rem; border: 1px solid var(--warm);
                 border-radius: .8rem; background: #fff; transition: border-color .12s, color .12s; }
  .dst-otros a:hover { border-color: var(--sky-mid); color: var(--text); }
  @media (max-width: 560px) { .dst-cab h1 { font-size: 1.75rem; } }
</style>
</head>
<body>

<nav>
  <a class="nav-logo" href="/">Disnerd<span>Sofi Valle Mayorga</span></a>
  <a href="https://wa.me/5491132924274?text=Hola%20Sofi!%20Vi%20tu%20p%C3%A1gina%20y%20quiero%20cotizar%20mi%20viaje" class="nav-cta">Cotizá tu viaje</a>
</nav>

<div class="dst">
  <header class="dst-cab">
    <div class="dst-emoji">__EMOJI__</div>
    <h1>__H1__</h1>
    <p>__INTRO__</p>
    <p class="pr-cuenta" id="pr-cuenta"></p>
  </header>

  <div class="pr-lista" id="pr-lista"></div>
</div>

<section class="dst-sep" id="cotiza">
  <h2>¿Ninguno te <em>cierra</em>?</h2>
  <p>Contame tu viaje y te armo uno a tu medida, con tus fechas y tu grupo.
     Es gratis y sin compromiso.</p>
</section>
<div style="max-width:560px;margin:0 auto;padding:0 1.5rem 3rem;" id="form-cotiza"></div>

<div class="dst-otros">
  <p>Otros destinos</p>
__OTROS__
</div>

<footer>
  <a href="/">disnerd.com.ar</a> · Sofi Valle Mayorga · Agente autorizada Disney &amp; Universal
</footer>

<script>window.PR_DESTINO = '__DESTINO__';</script>
<script src="/presupuestos.js"></script>
<script src="/formulario.js"></script>
<script src="/wa-flotante.js"></script>
<script src="/juegos-medicion.js"></script>
</body>
</html>
"""


def main():
    for d in DESTINOS:
        otros = "\n".join(
            '  <a href="/%s/">%s %s</a>' % (o["slug"], o["emoji"],
                                            o["h1"].replace("<em>", "").replace("</em>", ""))
            for o in DESTINOS if o["slug"] != d["slug"])
        html = PLANTILLA
        for k, v in [("__TITULO__", d["titulo"]), ("__DESC__", d["desc"]), ("__SLUG__", d["slug"]),
                     ("__H1__", d["h1"]), ("__INTRO__", d["intro"]), ("__EMOJI__", d["emoji"]),
                     ("__DESTINO__", d["destino"]), ("__OTROS__", otros)]:
            html = html.replace(k, v)
        carpeta = RAIZ / d["slug"]
        carpeta.mkdir(exist_ok=True)
        (carpeta / "index.html").write_text(html, encoding="utf-8")
        print("  /%s/" % d["slug"])


if __name__ == "__main__":
    main()
