/* ═══════════════ A DÓNDE VA DISNEY ═══════════════
   El catálogo de rutas de Disney Cruise Line.

   ⚠️ Acá sólo va lo CONSTATADO en las páginas de Disney, con fecha. La
   primera versión salió del sitemap, cuyas salidas van de ago-2025 a
   nov-2026 y en su mayoría ya zarparon: ahí Alaska figuraba de 7 noches
   cuando la página dice 6. El dato era de una temporada vieja.

   v: 1  ruta verificada el 27-10-2026 en la página de ese destino.
   v: 0  destino que Disney ofrece pero cuyas salidas no publica abiertas.
         No se le inventa barco ni duración.

   NO lleva precios ni fechas de salida: eso vive detrás del buscador de
   Disney, que rechaza la lectura automática. Cómo rehacerlo y qué se
   constató: _tools/cruceros_datos.md.

   r=región · d=destino · e=emoji · n=noches · s=puerto de salida
   b=barcos · t/tt=temporada temática · x=escalas o nota · v=verificada */
var RUTAS = [
  {"r": "bahamas","d": "Bahamas","e": "🏝️","n": 3, "s": "Fort Lauderdale","b": ["Dream"], "t": "","tt": "","x": "Disney Lookout Cay","v": 1},
  {"r": "bahamas","d": "Bahamas","e": "🏝️","n": 3, "s": "Port Canaveral","b": ["Dream","Fantasy","Wish"], "t": "","tt": "","x": "Nassau y Castaway Cay","v": 1},
  {"r": "bahamas","d": "Bahamas","e": "🏝️","n": 3, "s": "Fort Lauderdale","b": ["Dream"], "t": "navidad","tt": "🎄 Navidad","x": "Disney Lookout Cay y Nassau","v": 1},
  {"r": "bahamas","d": "Bahamas","e": "🏝️","n": 3, "s": "Port Canaveral","b": ["Dream","Wish"], "t": "navidad","tt": "🎄 Navidad","x": "Nassau y Castaway Cay","v": 1},
  {"r": "bahamas","d": "Bahamas","e": "🏝️","n": 3, "s": "Fort Lauderdale","b": ["Dream"], "t": "halloween","tt": "🎃 Halloween","x": "Disney Lookout Cay","v": 1},
  {"r": "bahamas","d": "Bahamas","e": "🏝️","n": 3, "s": "Port Canaveral","b": ["Dream","Wish"], "t": "halloween","tt": "🎃 Halloween","x": "Nassau y Castaway Cay","v": 1},
  {"r": "caribe","d": "Caribe occidental","e": "🌴","n": 4, "s": "Galveston","b": ["Magic"], "t": "","tt": "","x": "","v": 1},
  {"r": "caribe","d": "Caribe occidental","e": "🌴","n": 4, "s": "Galveston","b": ["Magic"], "t": "navidad","tt": "🎄 Navidad","x": "","v": 1},
  {"r": "caribe","d": "Caribe occidental","e": "🌴","n": 4, "s": "Galveston","b": ["Magic"], "t": "marvel","tt": "🦸 Marvel","x": "","v": 1},
  {"r": "caribe","d": "Caribe oriental","e": "🌴","n": 4, "s": "San Juan","b": ["Dream","Wish"], "t": "","tt": "","x": "Termina en Port Canaveral","v": 1},
  {"r": "caribe","d": "Caribe oriental","e": "🌴","n": 4, "s": "Fort Lauderdale","b": ["Dream"], "t": "","tt": "","x": "Termina en San Juan","v": 1},
  {"r": "alaska","d": "Alaska","e": "🏔️","n": 6, "s": "Vancouver","b": ["Magic"], "t": "","tt": "","x": "Glaciar Stikine, Icy Strait Point y Ketchikan","v": 1},
  {"r": "europa","d": "Europa del Norte","e": "⛵","n": 3, "s": "Southampton","b": ["Wish"], "t": "","tt": "","x": "Rotterdam (Ámsterdam)","v": 1},
  {"r": "europa","d": "Bélgica","e": "🧇","n": 3, "s": "Southampton","b": ["Wish"], "t": "","tt": "","x": "Zeebrugge (Bruselas)","v": 1},
  {"r": "bermuda","d": "Bermuda","e": "🐠","n": 4, "s": "Nueva York","b": ["Wish"], "t": "","tt": "","x": "King's Wharf","v": 1},
  {"r": "caribe","d": "Caribe sur","e": "🌴","n": "","s": "San Juan","b": [], "t": "","tt": "","x": "Varias rutas de 7 noches.","v": 0},
  {"r": "europa","d": "Mediterráneo","e": "🏛️","n": "","s": "Barcelona","b": [], "t": "","tt": "","x": "Empieza y termina en Barcelona.","v": 0},
  {"r": "europa","d": "Fiordos Noruegos","e": "⛰️","n": "","s": "Copenhague o Dover","b": [], "t": "","tt": "","x": "","v": 0},
  {"r": "europa","d": "Islas Británicas","e": "🫖","n": "","s": "Southampton","b": [], "t": "","tt": "","x": "","v": 0},
  {"r": "canada","d": "Canadá","e": "🍁","n": "","s": "Nueva York o Quebec","b": [], "t": "","tt": "","x": "Costa este de Canadá y Nueva Inglaterra.","v": 0},
  {"r": "mexico","d": "Riviera Mexicana","e": "🌮","n": "","s": "San Diego","b": [], "t": "","tt": "","x": "","v": 0},
  {"r": "mexico","d": "Baja California","e": "🌵","n": "2 a 5","s": "San Diego","b": [], "t": "","tt": "","x": "","v": 0},
  {"r": "panama","d": "Canal de Panamá","e": "⚓","n": "7 a 8","s": "Port Canaveral o San Diego","b": [], "t": "","tt": "","x": "Escalas en la Riviera Maya, la Riviera Mexicana y Colombia.","v": 0},
  {"r": "pacifico-costa","d": "Costa del Pacífico","e": "🌲","n": "4 o 5","s": "San Diego o Vancouver","b": [], "t": "","tt": "","x": "Navega entre San Diego y Vancouver.","v": 0},
  {"r": "transatlantico","d": "Transatlántico","e": "🌊","n": "11 a 15","s": "","b": [], "t": "","tt": "","x": "Cruza entre Estados Unidos y Europa.","v": 0},
  {"r": "hawai","d": "Hawái","e": "🌺","n": "","s": "","b": [], "t": "","tt": "","x": "Sale de la costa oeste.","v": 0},
  {"r": "pacifico","d": "Pacífico Sur","e": "🐚","n": "","s": "Honolulu o Sídney","b": [], "t": "","tt": "","x": "Entre Honolulú y Sídney.","v": 0},
  {"r": "singapur","d": "Singapur","e": "🏙️","n": "","s": "Singapur","b": [], "t": "","tt": "","x": "Con el Disney Adventure, el barco más nuevo.","v": 0},
  {"r": "oceania","d": "Nueva Zelanda y Australia","e": "🦘","n": "","s": "Sídney","b": [], "t": "","tt": "","x": "","v": 0}
];

var REGIONES = [["bahamas", "🏝️ Bahamas"], ["caribe", "🌴 Caribe"], ["alaska", "🏔️ Alaska"], ["europa", "🇪🇺 Europa"], ["mexico", "🌮 México"], ["bermuda", "🐠 Bermuda"], ["canada", "🍁 Canadá"], ["panama", "⚓ Canal de Panamá"], ["pacifico-costa", "🌲 Costa del Pacífico"], ["hawai", "🌺 Hawái"], ["pacifico", "🐚 Pacífico Sur"], ["transatlantico", "🌊 Transatlántico"], ["singapur", "🏙️ Singapur"], ["oceania", "🦘 Nueva Zelanda y Australia"]];

var WA_CRUCEROS = '5491132924274';
var fCru = { r: '', n: '', b: '', s: '' };

function cruOpciones(campo) {
  var v = [];
  RUTAS.forEach(function (x) {
    var y = campo === 'b' ? x.b : [x[campo]];
    y.forEach(function (z) {
      if (!z) return;
      /* "7 a 8" y "4 o 5" son destinos sin salidas publicadas: se muestran en
         la ficha, pero no como opcion para elegir, que confunde al lado de
         "7 noches". */
      if (campo === 'n' && !String(z).match(/^\d+$/)) return;
      if (v.indexOf(z) < 0) v.push(z);
    });
  });
  if (campo === 'n') v.sort(function (a, b) { return parseInt(a) - parseInt(b); });
  else v.sort();
  return v;
}

function cruFiltradas() {
  return RUTAS.filter(function (x) {
    return (!fCru.r || x.r === fCru.r)
        && (!fCru.n || String(x.n) === fCru.n)
        && (!fCru.b || x.b.indexOf(fCru.b) >= 0)
        && (!fCru.s || x.s === fCru.s);
  });
}

function cruChips() {
  var defs = [['r', 'Destino', REGIONES], ['n', 'Noches', null],
              ['b', 'Barco', null], ['s', 'Sale de', null]];
  defs.forEach(function (d) {
    var cont = document.getElementById('cru-f-' + d[0]);
    if (!cont) return;
    var ops = d[2] || cruOpciones(d[0]).map(function (v) { return [v, v]; });
    cont.innerHTML = '<button class="pr-chip' + (fCru[d[0]] ? '' : ' on') +
        '" data-c="' + d[0] + '" data-v="">Todos</button>' +
      ops.map(function (o) {
        var val = String(o[0]);
        var txt = d[0] === 'n' ? o[1] + (String(o[1]).match(/^\d+$/) ? ' noches' : '') : o[1];
        return '<button class="pr-chip' + (fCru[d[0]] === val ? ' on' : '') +
               '" data-c="' + d[0] + '" data-v="' + val + '">' + txt + '</button>';
      }).join('');
  });
}

function cruRender() {
  var l = cruFiltradas();
  var cont = document.getElementById('cru-lista');
  var cuenta = document.getElementById('cru-cuenta');
  if (cuenta) {
    cuenta.textContent = l.length === RUTAS.length
      ? RUTAS.length + ' rutas en total'
      : 'Mostrando ' + l.length + ' de ' + RUTAS.length;
  }
  if (!l.length) {
    cont.innerHTML = '<p class="pr-vacio">Con esa combinación no tengo ninguna cargada — ' +
      'pero <a href="#cotiza">preguntame</a> y lo averiguo.</p>';
    return;
  }
  cont.innerHTML = l.map(function (x) {
    var sub = [];
    if (x.n) sub.push(x.n + ' noches');
    if (x.s) sub.push('sale de ' + x.s);
    if (x.b.length) sub.push(x.b.map(function (b) { return 'Disney ' + b; }).join(' o '));
    /* Los destinos sin salidas publicadas no inventan barco ni duración. */
    if (!x.v && !x.n) sub.push('varias rutas');
    var msg = 'Hola Sofi! Me interesa el crucero a ' + x.d +
              (x.n ? ' de ' + x.n + ' noches' : '') +
              (x.s ? ' saliendo de ' + x.s : '') + '. Me pasás fechas y precio?';
    return '<article class="cru" data-reg="' + x.r + '">' +
      '<span class="cru-emoji">' + x.e + '</span>' +
      '<span class="cru-txt">' +
        '<span class="cru-dest">' + x.d + (x.tt ? ' <small class="cru-tema">' + x.tt + '</small>' : '') + '</span>' +
        '<span class="cru-sub">' + sub.join(' · ') + '</span>' +
        (x.x ? '<span class="cru-nota">' + x.x + '</span>' : '') +
      '</span>' +
      '<a class="cru-cta" target="_blank" rel="noopener" href="https://wa.me/' + WA_CRUCEROS +
        '?text=' + encodeURIComponent(msg) + '" data-dest="' + x.d + '">Precio</a>' +
    '</article>';
  }).join('');
}

document.addEventListener('click', function (e) {
  var chip = e.target.closest('#cru-filtros .pr-chip');
  if (chip) {
    fCru[chip.dataset.c] = chip.dataset.v;
    cruChips(); cruRender();
    if (typeof gtag === 'function') {
      gtag('event', 'filtrar_cruceros', { item: chip.dataset.c + ':' + (chip.dataset.v || 'todos') });
    }
    return;
  }
  var cta = e.target.closest('.cru-cta');
  if (cta && typeof gtag === 'function') {
    gtag('event', 'click_whatsapp', { ubicacion: 'catalogo_cruceros', item: cta.dataset.dest });
  }
});

if (document.getElementById('cru-lista')) { cruChips(); cruRender(); }
