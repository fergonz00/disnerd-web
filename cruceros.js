/* ═══════════════ A DÓNDE VA DISNEY ═══════════════
   El catálogo de rutas de Disney Cruise Line. NO lleva precios ni fechas de
   salida a propósito: eso vive detrás del buscador de Disney, que rechaza la
   lectura automática, y además cambia con cada promoción. Acá se muestra a
   dónde va, con qué barco, desde qué puerto y cuántas noches; el precio y la
   fecha los da Sofi.

   Los datos salen del sitemap público de disneycruise.disney.go.com (que
   robots.txt ofrece para ser leído y no bloquea /cruises-destinations/) más
   las páginas de cada destino. Para regenerarlo: _tools/cruceros_datos.md.

   r=región · d=destino · e=emoji · n=noches · s=puerto de salida
   b=barcos · t/tt=temporada temática · x=escalas o nota */
var RUTAS = [
  {r:"alaska",d:"Alaska",e:"🏔️",n:7,s:"Vancouver",b:["Magic"],t:"",tt:"",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:3,s:"Fort Lauderdale",b:["Dream"],t:"",tt:"",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:3,s:"Fort Lauderdale",b:["Dream"],t:"halloween",tt:"🎃 Halloween",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:3,s:"Fort Lauderdale",b:["Dream"],t:"navidad",tt:"🎄 Navidad",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:3,s:"Port Canaveral",b:["Wish"],t:"",tt:"",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:3,s:"Port Canaveral",b:["Wish"],t:"halloween",tt:"🎃 Halloween",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:3,s:"Port Canaveral",b:["Wish"],t:"navidad",tt:"🎄 Navidad",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:4,s:"Fort Lauderdale",b:["Dream"],t:"",tt:"",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:4,s:"Fort Lauderdale",b:["Dream"],t:"halloween",tt:"🎃 Halloween",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:4,s:"Fort Lauderdale",b:["Dream"],t:"navidad",tt:"🎄 Navidad",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:4,s:"Port Canaveral",b:["Fantasy", "Wish"],t:"navidad",tt:"🎄 Navidad",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:4,s:"Port Canaveral",b:["Fantasy", "Wish"],t:"",tt:"",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:4,s:"Port Canaveral",b:["Magic", "Wish"],t:"halloween",tt:"🎃 Halloween",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:5,s:"Fort Lauderdale",b:["Dream"],t:"halloween",tt:"🎃 Halloween",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:5,s:"Fort Lauderdale",b:["Dream"],t:"",tt:"",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:5,s:"Fort Lauderdale",b:["Destiny", "Dream"],t:"navidad",tt:"🎄 Navidad",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:5,s:"Port Canaveral",b:["Fantasy"],t:"navidad",tt:"🎄 Navidad",x:""},
  {r:"bahamas",d:"Bahamas",e:"🏝️",n:5,s:"Port Canaveral",b:["Fantasy"],t:"",tt:"",x:""},
  {r:"bermuda",d:"Bermuda",e:"🐠",n:4,s:"Nueva York",b:["Wish"],t:"",tt:"",x:"King's Wharf, Gran Bermuda"},
  {r:"caribe",d:"Caribe occidental",e:"🌴",n:4,s:"Galveston",b:["Magic"],t:"navidad",tt:"🎄 Navidad",x:""},
  {r:"caribe",d:"Caribe occidental",e:"🌴",n:4,s:"Galveston",b:["Magic"],t:"",tt:"",x:""},
  {r:"caribe",d:"Caribe occidental",e:"🌴",n:5,s:"Fort Lauderdale",b:["Dream"],t:"halloween",tt:"🎃 Halloween",x:""},
  {r:"caribe",d:"Caribe oriental",e:"🌴",n:7,s:"Port Canaveral",b:["Treasure"],t:"",tt:"",x:""},
  {r:"caribe",d:"Caribe occidental",e:"🌴",n:7,s:"Port Canaveral",b:["Treasure"],t:"",tt:"",x:""},
  {r:"caribe",d:"Caribe oriental",e:"🌴",n:7,s:"Port Canaveral",b:["Treasure"],t:"navidad",tt:"🎄 Navidad",x:""},
  {r:"caribe",d:"Caribe sur",e:"🌴",n:7,s:"San Juan",b:["Magic"],t:"halloween",tt:"🎃 Halloween",x:""},
  {r:"caribe",d:"Caribe sur",e:"🌴",n:7,s:"San Juan",b:["Magic"],t:"",tt:"",x:""},
  {r:"europa",d:"Europa del Norte",e:"⛵",n:3,s:"Southampton",b:["Wish"],t:"",tt:"",x:"Rotterdam (Ámsterdam), Países Bajos"},
  {r:"europa",d:"Bélgica",e:"🧇",n:3,s:"Southampton",b:["Wish"],t:"",tt:"",x:"Zeebrugge (Bruselas), Bélgica"},
  {r:"europa",d:"Mediterráneo",e:"🏛️",n:7,s:"Barcelona",b:["Dream"],t:"",tt:"",x:""},
  {r:"europa",d:"Islas Británicas",e:"🫖",n:7,s:"Southampton",b:["Fantasy"],t:"",tt:"",x:""},
  {r:"europa",d:"Fiordos Noruegos",e:"⛰️",n:7,s:"Southampton",b:["Fantasy"],t:"",tt:"",x:""},
  {r:"europa",d:"Europa occidental",e:"⛵",n:7,s:"Southampton",b:["Fantasy"],t:"",tt:"",x:""},
  {r:"europa",d:"Mediterráneo con islas griegas",e:"🏛️",n:9,s:"Barcelona",b:["Dream"],t:"",tt:"",x:""},
  {r:"hawai",d:"Hawái",e:"🌺",n:10,s:"Vancouver",b:["Wonder"],t:"",tt:"",x:""},
  {r:"mexico",d:"Baja California",e:"🌵",n:3,s:"San Diego",b:["Wonder"],t:"",tt:"",x:""},
  {r:"mexico",d:"Baja California",e:"🌵",n:4,s:"San Diego",b:["Magic"],t:"",tt:"",x:""},
  {r:"mexico",d:"Riviera Mexicana",e:"🌮",n:7,s:"San Diego",b:["Wonder"],t:"",tt:"",x:""},
  {r:"mexico",d:"Riviera Mexicana",e:"🌮",n:7,s:"San Diego",b:["Wonder"],t:"navidad",tt:"🎄 Navidad",x:""},
  {r:"pacifico",d:"Pacífico Sur",e:"🐚",n:14,s:"Honolulu",b:["Wonder"],t:"",tt:"",x:""},
  {r:"transatlantico",d:"Transatlántico",e:"🌊",n:14,s:"Fort Lauderdale",b:["Dream"],t:"",tt:"",x:""},
  {r:"canada",d:"Canadá",e:"🍁",n:null,s:"Nueva York o Quebec",b:[],t:"",tt:"",x:"Costa este de Canadá y Nueva Inglaterra."},
  {r:"panama",d:"Canal de Panamá",e:"⚓",n:"7 a 8",s:"Port Canaveral o San Diego",b:[],t:"",tt:"",x:"Cruza el canal, con escalas en la Riviera Maya, la Riviera Mexicana y Colombia."},
  {r:"pacifico-costa",d:"Costa del Pacífico",e:"🌲",n:"4 o 5",s:"San Diego o Vancouver",b:[],t:"",tt:"",x:"Navega entre San Diego y Vancouver."},
  {r:"singapur",d:"Singapur",e:"🏙️",n:null,s:"Singapur",b:[],t:"",tt:"",x:"Con el Disney Adventure, el barco más nuevo de la flota."},
  {r:"oceania",d:"Nueva Zelanda y Australia",e:"🦘",n:null,s:"Sídney",b:[],t:"",tt:"",x:""}
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
    if (x.n) sub.push(x.n + (String(x.n).match(/^\d+$/) ? ' noches' : ' noches'));
    if (x.s) sub.push('sale de ' + x.s);
    if (x.b.length) sub.push(x.b.map(function (b) { return 'Disney ' + b; }).join(' o '));
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
