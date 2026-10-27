# De dónde salen los datos de `cruceros.js`

El catálogo "A dónde va Disney" de `/cruceros-disney/`. Esto explica cómo se
rehace cuando Disney cambie su oferta.

## Qué tiene y qué no

Tiene **rutas**: destino, cuántas noches, de qué puerto sale, con qué barco y,
cuando corresponde, la temporada temática (Halloween, Navidad, Marvel).

**No tiene precios ni fechas de salida, a propósito.** Esos dos datos viven
detrás del buscador de Disney, que rechaza la lectura automática — devuelve
`Access Denied`. Saltear ese bloqueo no es una opción: es lo mismo que nos
pasó con ETKA y la sanción es que te bloquean la cuenta. Además los precios de
Disney cambian con cada promoción, la fecha, el barco, el camarote y cuántos
viajan, así que un "desde USD X" copiado quedaría viejo en semanas y
contradiría lo que ya decimos en `/cuanto-cuesta-ir-a-disney/`: *"seguramente
no va a ser tu precio"*.

Por eso cada ruta cierra en un botón que abre WhatsApp con la ruta ya escrita.
El precio lo pone Sofi, que tiene el cotizador de agente y aplica los
descuentos vigentes.

## Las dos fuentes

**1. El sitemap.** `https://disneycruise.disney.go.com/sitemap.xml` (unos
32 MB, 5.573 URLs). `robots.txt` lo publica justamente para que lo lean los
buscadores y **no** bloquea `/cruises-destinations/`.

Las 94 URLs bajo `/cruises-destinations/list/` traen todo en la propia
dirección:

    /cruises-destinations/list/DD1424/4-Night-Bahamian-Cruise-from-Fort-Lauderdale/2025-08-25-Disney-Dream/
                               código  noches  ruta          puerto            fecha      barco

De ahí salieron 40 rutas distintas. Ojo: **esas 94 salidas son una muestra y
en su mayoría ya zarparon** (van de ago-2025 a nov-2026). Sirven para saber
qué rutas hace Disney, no como calendario.

**2. Las páginas de cada destino**, leídas una por una, por ejemplo
`/cruises-destinations/itineraries/bahamas/`. Cada una tiene pestañas por
duración, pero **sólo la primera trae contenido**: las demás cargan por
JavaScript y no tienen URL propia. Varias páginas (México, Canal de Panamá)
no listan ninguna salida y mandan al buscador. De acá salieron Bermuda,
Europa del Norte y Bélgica.

## Para rehacerlo

1. Bajar el sitemap con `curl` y un User-Agent de navegador.
2. Sacar las URLs de `/cruises-destinations/list/` y parsear noches, ruta,
   puerto y barco desde la dirección.
3. Completar a mano los destinos sin salidas publicadas (Canadá, Canal de
   Panamá, Costa del Pacífico, Singapur, Nueva Zelanda y Australia) con lo que
   diga la página de cada uno.
4. Pegar el resultado en el array `RUTAS` de `/cruceros.js`.

Dos cosas que ya se corrigieron y conviene no repetir:

- Las **banderas** (🇪🇺, 🇧🇪, 🏴) no se dibujan en Windows ni en varios
  Android: se ven como las dos letras del país. Usar otro emoji.
- En el filtro de noches, los valores que no son un número exacto ("7 a 8",
  "4 o 5") **no** se ofrecen como opción, porque al lado de "7 noches"
  confunden. Se muestran igual dentro de la ficha.

## Si alguna vez hace falta la oferta completa

Sofi la tiene en el sistema de agente, con fechas y precios. Eso es lo único
que da el calendario entero; desde afuera no está publicado.

## Lo que se constató el 27-10-2026 (y por qué se rehizo el catálogo)

La primera versión salió entera del sitemap. Al revisarla aparecieron dos
cosas:

**1. El sitemap es histórico, no es la oferta vigente.** Sus 94 salidas van
del 11-08-2025 al 25-11-2026 y, a la fecha del chequeo, **sólo 6 de las 40
rutas tenían alguna salida futura** — y las seis eran de Navidad, que
terminan el 25 de noviembre. No hay una sola salida de 2027 ahí, aunque
Disney ya vende hasta 2028.

**2. Por eso había un dato mal publicado.** El sitemap daba *Alaska, 7 noches
desde Vancouver*; la página de Alaska dice hoy **6 noches**. Era una
temporada vieja.

Desde entonces el catálogo lleva sólo lo verificado en las páginas de
destino, con la marca `v: 1`, y los demás destinos van sin barco ni duración
inventados (`v: 0`). `_tools/test_cruceros.py` lo controla: si alguna ficha
`v: 0` aparece con barco o con un número de noches, la prueba falla.

**Sobre las fechas: sí cambian, y está constatado.** Una misma ruta sale
varias veces al año — la "Bahamas 4 noches desde Port Canaveral" tiene 14
salidas distintas entre agosto de 2025 y abril de 2026, y 19 de las 40 rutas
del sitemap tienen más de una fecha. Además Disney renueva los itinerarios
por temporada: su propia navegación anuncia "nuevos itinerarios de septiembre
2027 a mayo 2028". Por eso la página dice que las fechas cambian y que se
piden.

**Cuándo rehacerlo:** conviene revisar las páginas de destino cada temporada.
Lo que más se mueve es la duración y el barco de cada ruta, que es
justamente lo que falló con Alaska.
