/* ═══════════════ PRESUPUESTOS DE SOFI ═══════════════
   Para AGREGAR uno nuevo: copiar un bloque de abajo y cambiar los datos.
   Para SACAR uno vencido: borrar su bloque. La lista, los filtros y el
   contador se arman solos.

   ⚠️ Cada presupuesto va SOLO. Aunque las fechas se encadenen (Disney y
   despues Universal del mismo viaje), nunca se combinan ni se suma un
   "total del viaje": son dos presupuestos separados.
   ⚠️ Nunca poner el nombre del cliente: se titula por lo que es.

   destino: disney | universal | crucero | paris
   quienes: solo | pareja | familia | grupo
   desde:   el numero mas bajo, para ordenar y mostrar "desde USD ..."
   tema:    el color. Lo define el DESTINO (disney | universal | oceano | paris),
            salvo los de temporada que lo pisan: navidad | anonuevo.
*/

const PRESUPUESTOS = [

  {
    id: 'crucero-navidad', tema: 'navidad', destino: 'crucero', quienes: 'pareja', anio: 2026,
    emoji: '🎄', badge: 'Presupuesto actualizado',
    titulo: 'Crucero Disney temático de Navidad',
    cuando: 'Nov 2026', personas: '2 adultos', noches: '3 noches', desde: 1636,
    fechas: 'Del 20 al 24 de noviembre 2026',
    meta: ['🚢 Barco Disney Dream', '📍 Desde Miami · Fort Lauderdale', '🌙 3 noches · 2 adultos'],
    itinerario: [['Día 1', 'Abordaje Fort Lauderdale'], ['Día 2', 'Nassau, Bahamas'],
                 ['Día 3', 'Isla de Disney'], ['Día 4', 'Desembarque']],
    tabla: { titulo: '🛏️ Camarotes · 2 adultos', filas: [
      ['Inside', 'sin vista', 'USD 1.636'],
      ['Oceanview', 'vista al mar', 'USD 1.720'],
      ['Verandah', 'con balcón', 'USD 1.876']] },
    nota: '<strong>Total por los dos.</strong> TODO incluido salvo alcohol y propinas (USD 17 por persona por noche).',
    cta: 'Quiero este crucero',
    wa: 'Hola Sofi! Me interesa el crucero Disney Dream de Navidad del 20 al 24 de noviembre 2026'
  },

  {
    id: 'crucero-destiny', tema: 'oceano', destino: 'crucero', quienes: 'familia', anio: 2027,
    emoji: '🚢', badge: '¡El barco nuevo!',
    titulo: 'Crucero Disney Destiny',
    cuando: 'Jul 2027', personas: '2 adultos + 2 menores', noches: '4 noches', desde: 5200,
    fechas: 'Del 22 al 26 de julio 2027',
    meta: ['📍 Desde Miami · Fort Lauderdale', '🌙 4 noches · 2 adultos + 2 menores (5 años y 1 bebé)'],
    itinerario: [['Día 1', 'Abordaje Fort Lauderdale'], ['Día 2', 'Nassau, Bahamas'],
                 ['Día 3', 'Disney Castaway Cay'], ['Día 4', 'Día en el mar'],
                 ['Día 5', 'Desembarque en Fort Lauderdale']],
    tabla: { titulo: '🛏️ Camarotes · 2 adultos + 2 menores', filas: [
      ['Inside', 'sin vista', 'USD 5.200'],
      ['Oceanview', 'vista al mar', 'USD 5.603'],
      ['Verandah', 'con balcón', 'USD 6.024']] },
    nota: '<strong>Total por los cuatro.</strong> TODO incluido salvo alcohol y propinas (USD 17 por persona por noche).',
    cta: 'Quiero este crucero',
    wa: 'Hola Sofi! Me interesa el crucero Disney Destiny del 22 al 26 de julio 2027'
  },

  {
    id: 'paris-ano-nuevo', tema: 'anonuevo', destino: 'paris', quienes: 'grupo', anio: 2026,
    emoji: '🎆', badge: 'Año Nuevo',
    titulo: 'Año Nuevo en Disneyland París',
    cuando: 'Dic 2026 · Ene 2027', personas: 'de 2 a 4 adultos', noches: '2 noches', desde: 1657,
    fechas: 'Del 30 de diciembre 2026 al 1 de enero 2027',
    meta: ['🌙 2 noches'],
    incluye: ['🏨 Hotel Santa Fe (el + económico, temático de Cars)', '🎟️ Tickets parques'],
    tabla: { titulo: '🛏️ Precio por habitación', filas: [
      ['2 adultos', '', 'USD 1.657'],
      ['3 adultos', 'misma habitación · 2 camas, duermen los 3', 'USD 2.130'],
      ['4 adultos', '', 'USD 2.603']] },
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa Año Nuevo en Disneyland París'
  },

  {
    id: 'disney-enero-familia', tema: 'disney', destino: 'disney', quienes: 'familia', anio: 2027,
    emoji: '👨‍👩‍👦', badge: 'Nuevo',
    titulo: 'Disney en familia · All Star Movies',
    cuando: 'Ene 2027', personas: '2 adultos + 1 menor', noches: '6 noches', desde: 2646,
    fechas: 'Del 17 al 23 de enero 2027',
    meta: ['🌙 6 noches · 2 adultos + 1 menor (12 años)'],
    incluye: ['🏨 Disney All Star Movies · Preferred Room (el + económico, súper temático y en promo)',
              '🎟️ 4 días de parques Disney base (un parque por día)',
              '🛍️ Un día de descanso / shopping en el medio'],
    precio: 'USD 2.646', precioNota: 'total por los tres · sin plan de comidas',
    comidas: [['Quick Service', 'USD 3.399'], ['Dining Plan', 'USD 3.844']],
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Disney en familia del 17 al 23 de enero 2027'
  },

  {
    id: 'disney-enero-movies', tema: 'disney', destino: 'disney', quienes: 'pareja', anio: 2027,
    emoji: '🎥', badge: 'Con promo',
    titulo: 'Disney · All Star Movies',
    cuando: 'Ene 2027', personas: '2 adultos', noches: '6 noches', desde: 2675,
    fechas: 'Del 10 al 16 de enero 2027',
    meta: ['🌙 6 noches · 2 adultos'],
    incluye: ['🏨 Hotel Disney All Star Movies (el + económico y súper temático)',
              '🎟️ 4 días de parques Disney base (un parque por día)',
              '🛍️ Un día de descanso / shopping en el medio'],
    promo: '🏷️ Con promo de descuento aplicada · ¡se puede agotar!',
    precio: 'USD 2.675', precioNota: 'total por los dos · sin plan de comidas',
    comidas: [['Quick Service', 'USD 3.428'], ['Dining Plan', 'USD 3.873']],
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Disney All Star Movies enero 2027'
  },

  {
    id: 'disney-febrero-pop', tema: 'disney', destino: 'disney', quienes: 'pareja', anio: 2027,
    emoji: '💜', badge: 'Nuevo',
    titulo: 'Disney · Pop Century',
    cuando: 'Feb 2027', personas: '2 adultos', noches: '6 noches', desde: 4620,
    fechas: 'Del 1 al 7 de febrero 2027',
    meta: ['🌙 6 noches · 2 adultos'],
    incluye: ['🏨 Disney Pop Century Resort · Standard Room',
              '🎫 4 días de parques Disney base'],
    precio: 'USD 4.620', precioNota: 'total por los dos · sin plan de comidas',
    comidas: [['Quick Service', 'USD 5.905'], ['Dining Plan', 'USD 6.609']],
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Disney Pop Century febrero 2027'
  },

  {
    id: 'universal-febrero', tema: 'universal', destino: 'universal', quienes: 'pareja', anio: 2027,
    emoji: '🩵', badge: 'Nuevo',
    titulo: 'Universal · Endless Summer Dockside Inn',
    cuando: 'Feb 2027', personas: '2 adultos', noches: '4 noches', desde: 1706,
    fechas: 'Del 7 al 11 de febrero 2027',
    meta: ['🌙 4 noches · 2 adultos'],
    incluye: ['🏨 Universal Endless Summer Dockside Inn (¡el más económico!)',
              '🎫 3 días de parques Universal base (un parque por día)',
              '🌿 El 7 sería día de descanso'],
    precio: 'USD 1.706', precioNota: 'total por los dos',
    nota: '🥗 Universal no tiene planes de comidas.',
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Universal Dockside Inn febrero 2027'
  },

  {
    id: 'disney-abril-grupo', tema: 'disney', destino: 'disney', quienes: 'grupo', anio: 2027,
    emoji: '👑', badge: 'Con promo',
    titulo: 'Disney en grupo · All Star',
    cuando: 'Abr 2027', personas: '3 adultos', noches: '3 noches', desde: 1715,
    fechas: 'Del 25 al 28 de abril 2027',
    meta: ['🌙 3 noches · 3 adultos'],
    incluye: ['🏨 Disney All Star Movies o Music 🎥 🎶 · Preferred Room (los + económicos, súper temáticos)',
              '🎟️ 2 días de parques Disney base (un parque por día)'],
    promo: '🏷️ Con promo de descuento aplicada · ¡se puede agotar!',
    precio: 'USD 1.715', precioNota: 'total por los tres',
    comidas: [['Quick Service', 'USD 2.280'], ['Dining Plan', 'USD 2.614']],
    comidasNota: 'sobre el paquete de 2 días de parques',
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Disney en grupo del 25 al 28 de abril 2027'
  },

  {
    id: 'universal-abril-grupo', tema: 'universal', destino: 'universal', quienes: 'grupo', anio: 2027,
    emoji: '👑', badge: 'Nuevo',
    titulo: 'Universal en grupo · Terra Luna',
    cuando: 'Abr · May 2027', personas: '3 adultos', noches: '3 noches', desde: 2047,
    fechas: 'Del 28 de abril al 1 de mayo 2027',
    meta: ['🌙 3 noches · 3 adultos'],
    incluye: ['🏨 Hotel Universal Terra Luna (nuevo, cerca de Epic Universe)',
              '🎟️ 1 día park to park + 1 día Epic Universe'],
    precio: 'USD 2.047', precioNota: 'total por los tres',
    nota: '🥗 Universal no tiene planes de comidas.',
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Universal en grupo del 28 de abril al 1 de mayo 2027'
  },

  {
    id: 'disney-abril-pasadita', tema: 'disney', destino: 'disney', quienes: 'pareja', anio: 2027,
    emoji: '⚡', badge: 'Con promo',
    titulo: 'Disney · ¡Pasadita rápida!',
    cuando: 'Abr 2027', personas: '2 adultos', noches: '5 noches', desde: 2203,
    fechas: 'Del 25 al 30 de abril 2027',
    meta: ['🌙 5 noches · 2 adultos'],
    incluye: ['🏨 Disney All Star Movies o Music 🎥 🎶 · Preferred Room (los + económicos, súper temáticos)',
              '🎟️ 3 días de parques Disney base (un parque por día)'],
    promo: '🏷️ Con promo de descuento aplicada · ¡se puede agotar!',
    precio: 'USD 2.203', precioNota: 'total por los dos',
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Disney pasadita rápida All Star abril 2027'
  },

  {
    id: 'disney-mayo-familia', tema: 'disney', destino: 'disney', quienes: 'familia', anio: 2027,
    emoji: '👨‍👩‍👧‍👦', badge: 'Nuevo',
    titulo: 'Una semana de Disney en familia',
    cuando: 'May 2027', personas: '2 adultos + 3 menores', noches: '7 noches', desde: 5830,
    fechas: 'Del 14 al 21 de mayo 2027',
    meta: ['🌙 7 noches · 2 adultos + 3 menores (15, 9 y 1 año)'],
    incluye: ['🏨 Disney All Star Music · Suite familiar (el más económico, súper temático)',
              '🎟️ 4 días de parques Disney base (un parque por día)'],
    precio: 'USD 5.830', precioNota: 'total por los cinco · sin plan de comidas',
    comidas: [['Quick Service', 'USD 7.587'], ['Dining Plan', 'USD 8.626']],
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Disney en familia del 14 al 21 de mayo 2027'
  },

  {
    id: 'paris-junio', tema: 'paris', destino: 'paris', quienes: 'pareja', anio: 2027,
    emoji: '🥐', badge: 'Nuevo',
    titulo: 'Disneyland París · Junio 2027',
    cuando: 'Jun 2027', personas: '2 adultos', noches: '2 noches', desde: 1307,
    fechas: 'Del 1 al 3 de junio 2027',
    meta: ['🌙 2 noches · 2 adultos'],
    incluye: ['🏨 Hotel Disney Santa Fe · Standard Room (el hotel más económico, temático de Cars)',
              '🎟️ Tickets parques · entrada ilimitada desde el día de check in a check out incluido'],
    precio: 'USD 1.307', precioNota: 'total por los dos',
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa Disneyland París junio 2027'
  },

  {
    id: 'disney-agosto-sola', tema: 'disney', destino: 'disney', quienes: 'solo', anio: 2027,
    emoji: '🧜‍♀️', badge: 'Nuevo',
    titulo: 'Disney sola · Art of Animation',
    cuando: 'Ago 2027', personas: '1 adulto', noches: '7 noches', desde: 2644,
    fechas: 'Del 22 al 29 de agosto 2027',
    meta: ['🌙 7 noches · 1 adulto'],
    incluye: ['🏨 Disney Art of Animation · Habitación de La Sirenita',
              '🎫 5 días de parques Disney base (un parque por día)'],
    precio: 'USD 2.644', precioNota: 'por una persona · sin plan de comidas',
    comidas: [['Quick Service', 'USD 3.084'], ['Dining Plan', 'USD 3.344']],
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Disney sola del 22 al 29 de agosto 2027'
  },

  {
    id: 'universal-agosto-sola', tema: 'universal', destino: 'universal', quienes: 'solo', anio: 2027,
    emoji: '🎢', badge: 'En promo',
    titulo: 'Universal sola · Stella Nova',
    cuando: 'Ago · Sep 2027', personas: '1 adulto', noches: '7 noches', desde: 1473,
    fechas: 'Del 29 de agosto al 5 de septiembre 2027',
    meta: ['🌙 7 noches · 1 adulto'],
    incluye: ['🏨 Universal Stella Nova (nuevo, cerca de Epic Universe)',
              '🎫 4 días de parques Universal park to park, en promo'],
    precio: 'USD 1.473', precioNota: 'por una persona',
    nota: '🥗 Universal no tiene planes de comidas.',
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Universal sola del 29 de agosto al 5 de septiembre 2027'
  },

  {
    id: 'paris-noviembre', tema: 'navidad', destino: 'paris', quienes: 'pareja', anio: 2026,
    emoji: '🎄', badge: 'Época navideña',
    titulo: 'Disneyland París · Época Navideña',
    cuando: 'Nov 2026', personas: '2 adultos', noches: '2 noches', desde: 1056,
    fechas: 'Del 10 al 12 de noviembre 2026',
    meta: ['🌙 2 noches · 2 adultos'],
    incluye: ['🏨 Hotel Santa Fe · Standard Room (temático Cars)',
              '🎟️ Tickets con entrada ilimitada · del check in al check out',
              '🎟️ Pueden entrar y salir del parque, y cruzarse entre ellos'],
    precio: 'USD 1.056', precioNota: 'total por los dos · sin plan de comidas',
    comidas: [['🥐 Breakfast · desayuno buffet en el hotel', 'USD 1.155'],
              ['🥐🍳 Half Board · desayuno + 1 reserva en restaurante', 'USD 1.303'],
              ['🥐🍳🥘 Full Board Plus · desayuno + 1 quick service + 1 reserva', 'USD 1.393']],
    cta: 'Quiero este paquete',
    wa: 'Hola Sofi! Me interesa el paquete Disneyland París navideño noviembre 2026'
  }

];

/* ═══════════════ Filtros y armado de la lista ═══════════════ */

const FILTROS = {
  destino: [['', 'Todos'], ['disney', '🏰 Disney'], ['universal', '🎢 Universal'],
            ['crucero', '🚢 Cruceros'], ['paris', '🥐 París']],
  quienes: [['', 'Cualquiera'], ['solo', '🧍 Solo/a'], ['pareja', '👫 En pareja'],
            ['familia', '👨‍👩‍👧 En familia'], ['grupo', '👑 En grupo']],
  anio: [['', 'Cualquiera'], ['2026', '2026'], ['2027', '2027']]
};

var filtroActual = { destino: '', quienes: '', anio: '' };

function pMoneda(n) {
  return 'USD ' + n.toLocaleString('es-AR');
}

function pDetalle(p) {
  var h = '<div class="pr-fechas">📅 ' + p.fechas + '</div>';
  if (p.meta && p.meta.length) {
    h += '<div class="pr-meta">' + p.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('') + '</div>';
  }
  if (p.itinerario) {
    h += '<div class="pr-caja"><h4>🗺️ Itinerario</h4>' +
         p.itinerario.map(function (d) { return '<div class="pr-dia"><b>' + d[0] + '</b> ' + d[1] + '</div>'; }).join('') +
         '</div>';
  }
  if (p.incluye) {
    h += '<div class="pr-caja"><h4>✨ Qué incluye</h4>' +
         p.incluye.map(function (i) { return '<div class="pr-item">' + i + '</div>'; }).join('') +
         '</div>';
  }
  if (p.promo) h += '<p class="pr-promo">' + p.promo + '</p>';
  if (p.tabla) {
    h += '<div class="pr-caja"><h4>' + p.tabla.titulo + '</h4>' +
         p.tabla.filas.map(function (f) {
           return '<div class="pr-fila"><div><div class="pr-f-nom">' + f[0] + '</div>' +
                  (f[1] ? '<div class="pr-f-sub">' + f[1] + '</div>' : '') +
                  '</div><div class="pr-f-precio">' + f[2] + '</div></div>';
         }).join('') + '</div>';
  }
  if (p.precio) {
    h += '<div class="pr-precio-row"><span class="pr-precio">' + p.precio + '</span>' +
         '<span class="pr-precio-nota">' + (p.precioNota || '') + '</span></div>';
  }
  if (p.comidas) {
    h += '<div class="pr-caja"><h4>🥗 Opcional · plan de comidas' +
         (p.comidasNota ? ' <span class="pr-f-sub">(' + p.comidasNota + ')</span>' : ' (total del paquete)') + '</h4>' +
         p.comidas.map(function (c) {
           return '<div class="pr-fila"><div class="pr-f-nom">' + c[0] + '</div>' +
                  '<div class="pr-f-precio">' + c[1] + '</div></div>';
         }).join('') + '</div>';
  }
  if (p.nota) h += '<p class="pr-nota">' + p.nota + '</p>';
  h += '<a class="pr-wa" target="_blank" href="https://wa.me/5491132924274?text=' +
       encodeURIComponent(p.wa) + '">' + (p.cta || 'Quiero este paquete') + ' 💬</a>';
  h += '<p class="pr-legal">* Precios sin vuelos, sujetos a disponibilidad.</p>';
  return h;
}

function pRender() {
  var lista = PRESUPUESTOS.filter(function (p) {
    return (!filtroActual.destino || p.destino === filtroActual.destino) &&
           (!filtroActual.quienes || p.quienes === filtroActual.quienes) &&
           (!filtroActual.anio || String(p.anio) === filtroActual.anio);
  }).sort(function (a, b) { return a.desde - b.desde; });

  var cont = document.getElementById('pr-lista');
  var cuenta = document.getElementById('pr-cuenta');

  if (!lista.length) {
    cont.innerHTML = '<p class="pr-vacio">No hay presupuestos armados con esa combinación todavía — ' +
      'pero <a href="#cotiza">pedime el tuyo</a> y te lo armo.</p>';
    cuenta.textContent = 'Ninguno con ese filtro';
    return;
  }

  cuenta.textContent = lista.length === PRESUPUESTOS.length
    ? PRESUPUESTOS.length + ' presupuestos reales'
    : 'Mostrando ' + lista.length + ' de ' + PRESUPUESTOS.length;

  cont.innerHTML = lista.map(function (p) {
    return '<article class="pr" data-tema="' + (p.tema || 'disney') + '" id="p-' + p.id + '">' +
      '<button class="pr-cab" aria-expanded="false" data-id="' + p.id + '">' +
        '<span class="pr-emoji">' + p.emoji + '</span>' +
        '<span class="pr-cab-txt">' +
          '<span class="pr-titulo">' + p.titulo + '</span>' +
          '<span class="pr-sub">' + p.cuando + ' · ' + p.personas + ' · ' + p.noches + '</span>' +
        '</span>' +
        '<span class="pr-desde"><small>desde</small>' + pMoneda(p.desde) + '</span>' +
        '<span class="pr-flecha" aria-hidden="true">⌄</span>' +
      '</button>' +
      '<div class="pr-det" hidden>' + pDetalle(p) + '</div>' +
    '</article>';
  }).join('');
}

function pChips() {
  ['destino', 'quienes', 'anio'].forEach(function (campo) {
    var cont = document.getElementById('pr-f-' + campo);
    if (!cont) return;
    cont.innerHTML = FILTROS[campo].map(function (o) {
      return '<button class="pr-chip' + (filtroActual[campo] === o[0] ? ' on' : '') +
             '" data-campo="' + campo + '" data-valor="' + o[0] + '">' + o[1] + '</button>';
    }).join('');
  });
}

document.addEventListener('click', function (e) {
  var chip = e.target.closest('.pr-chip');
  if (chip) {
    filtroActual[chip.dataset.campo] = chip.dataset.valor;
    pChips(); pRender();
    if (typeof gtag === 'function') {
      gtag('event', 'filtrar_presupuestos', {
        destino: filtroActual.destino || '(todos)',
        quienes: filtroActual.quienes || '(cualquiera)',
        anio: filtroActual.anio || '(cualquiera)'
      });
    }
    return;
  }
  var cab = e.target.closest('.pr-cab');
  if (cab) {
    var art = cab.closest('.pr');
    var det = art.querySelector('.pr-det');
    var abriendo = det.hidden;
    det.hidden = !abriendo;
    cab.setAttribute('aria-expanded', abriendo ? 'true' : 'false');
    art.classList.toggle('abierto', abriendo);
    if (abriendo && typeof gtag === 'function') {
      var p = PRESUPUESTOS.find(function (x) { return x.id === cab.dataset.id; });
      gtag('event', 'ver_presupuesto', { item: p ? p.titulo : cab.dataset.id });
    }
  }
});

pChips();
pRender();
