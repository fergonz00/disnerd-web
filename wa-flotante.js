/* Botón de WhatsApp siempre a mano. Lo usan la home, las páginas de los
   juegos y las de destino: alcanza con cargar este archivo y su css.
   Se dibuja solo, no hace falta ponerlo en el html de cada página. */
(function(){
  var a = document.createElement('a');
  a.id = 'wa-flotante';
  a.className = 'wa-flotante';
  a.href = 'https://wa.me/5491132924274?text=Hola%20Sofi!%20Vi%20tu%20p%C3%A1gina%20y%20quiero%20cotizar%20mi%20viaje';
  a.setAttribute('aria-label', 'Escribile a Sofi por WhatsApp');
  a.innerHTML = '<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.136 1.535 5.874L.057 23.882a.5.5 0 0 0 .61.61l6.008-1.478A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a10 10 0 0 1-5.13-1.406l-.367-.22-3.566.878.893-3.458-.24-.377A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>' + ' Cotizá gratis';
  document.body.appendChild(a);
})();

/* El botón flotante entra cuando el visitante ya pasó el hero, y se esconde
   mientras está a la vista el formulario: ahí tapaba los desplegables en
   celular, y además el formulario ya tiene su propio botón. */
(function(){
  var b = document.getElementById('wa-flotante');
  var form = document.getElementById('cotiza');
  if (!b) return;
  /* "A la vista" = se ve un pedazo real, no un pixel suelto al borde */
  function aLaVista(el){
    if (!el) return false;
    var r = el.getBoundingClientRect();
    var visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    return visible > 80;
  }
  /* Se esconde si ya hay otro boton de WhatsApp a la vista: el del formulario
     o el de un presupuesto abierto. Si no, tapa justo el que importa. */
  function otroCtaALaVista(){
    if (aLaVista(form)) return true;
    var botones = document.querySelectorAll('.pr-det:not([hidden]) .pr-wa');
    for (var i = 0; i < botones.length; i++) {
      if (aLaVista(botones[i])) return true;
    }
    return false;
  }
  /* En la home aparece pasados 500 px. En páginas cortas —los juegos— ese
     umbral no se alcanza nunca, así que se adapta a lo que se puede scrollear. */
  function umbral(){
    var scrolleable = document.body.scrollHeight - window.innerHeight;
    return Math.min(500, Math.max(120, scrolleable * 0.35));
  }
  function revisar(){
    var scrolleable = document.body.scrollHeight - window.innerHeight;
    // si la página entra entera en la pantalla no hay scroll que esperar
    var corresponde = scrolleable < 60 ? true : window.scrollY > umbral();
    if (corresponde && !otroCtaALaVista()) b.classList.add('visible');
    else b.classList.remove('visible');
  }
  document.addEventListener('click', function(){ setTimeout(revisar, 60); }, true);
  window.addEventListener('scroll', revisar, { passive: true });
  window.addEventListener('resize', revisar, { passive: true });
  revisar();
})();
