# -*- coding: utf-8 -*-
"""Marca las preguntas de cada pagina como FAQPage para Google.

Las preguntas ya estan escritas en la pagina, dentro de <details>. Esto las
lee del HTML y genera el bloque JSON-LD, para que el marcado y lo que ve la
persona digan exactamente lo mismo: Google penaliza el schema que no coincide
con el contenido visible.

    python _tools/schema_preguntas.py           lo deja al dia
    python _tools/schema_preguntas.py --ver     solo informa, no toca nada

Correrlo de nuevo cada vez que se agregue o cambie una pregunta.
"""
import html
import json
import pathlib
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = pathlib.Path(__file__).resolve().parent.parent
SOLO_VER = "--ver" in sys.argv

PAGINAS = ["cuanto-cuesta-ir-a-disney", "disney-orlando", "universal-orlando",
           "cruceros-disney", "disneyland-paris"]

INICIO = "<!-- preguntas para Google (lo genera _tools/schema_preguntas.py) -->"
FIN = "<!-- fin preguntas para Google -->"


def texto(bruto):
    """Saca las etiquetas y deja el texto como lo lee una persona."""
    t = re.sub(r"<br\s*/?>", " ", bruto)
    t = re.sub(r"</p>\s*<p[^>]*>", " ", t)
    t = re.sub(r"<[^>]+>", "", t)
    t = html.unescape(t)
    return re.sub(r"\s+", " ", t).strip()


cambios = 0
for slug in PAGINAS:
    f = RAIZ / slug / "index.html"
    t = f.read_text(encoding="utf-8")

    pares = re.findall(r"<details[^>]*>\s*<summary>(.*?)</summary>\s*(.*?)</details>", t, re.S)
    faqs = []
    for pregunta, respuesta in pares:
        p, r = texto(pregunta), texto(respuesta)
        if not p or not r:
            continue
        faqs.append({"@type": "Question", "name": p,
                     "acceptedAnswer": {"@type": "Answer", "text": r}})

    if not faqs:
        print("  %-26s sin preguntas, se saltea" % slug)
        continue

    bloque = (INICIO + '\n<script type="application/ld+json">\n'
              + json.dumps({"@context": "https://schema.org", "@type": "FAQPage",
                            "mainEntity": faqs}, ensure_ascii=False, indent=1)
              + "\n</script>\n" + FIN)

    if INICIO in t:
        t = re.sub(re.escape(INICIO) + r".*?" + re.escape(FIN), lambda _: bloque, t, flags=re.S)
        que = "actualizado"
    else:
        assert "</head>" in t, slug
        t = t.replace("</head>", bloque + "\n</head>", 1)
        que = "agregado"

    largo = sum(len(x["acceptedAnswer"]["text"]) for x in faqs)
    print("  %-26s %2d preguntas · %5d caracteres de respuesta · %s"
          % (slug, len(faqs), largo, que if not SOLO_VER else "(solo mirando)"))
    if not SOLO_VER:
        f.write_text(t, encoding="utf-8")
        cambios += 1

print()
print("  %d paginas %s" % (cambios, "actualizadas" if cambios else "sin tocar"))
