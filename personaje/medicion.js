/* MEDICIÓN: clics a WhatsApp desde el test */
document.addEventListener('click', function(e){
  const el = e.target;
  if (!el || !el.closest) return;
  const a = el.closest('a');
  if (!a || (a.getAttribute('href') || '').indexOf('wa.me') === -1) return;

  const enResultado = !!a.closest('#scr-res');
  let personaje = '(generico)';
  if (enResultado) {
    try { personaje = JSON.parse(document.getElementById('scr-res').dataset.ganador).nombre; } catch (err) {}
  }
  if (typeof gtag === 'function') {
    gtag('event', 'click_whatsapp', {
      ubicacion: enResultado ? 'quiz_resultado' : 'nav',
      item: personaje
    });
  }
}, true);
