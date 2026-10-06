/* Formulario "Cotizá tu viaje". Lo usan la home y las páginas por destino.
   Se dibuja dentro de <div id="form-cotiza"></div>.

   Es el formulario CORTO: tres toques y nada que teclear. El largo pedía
   además el celular, los días, las edades de los menores y un comentario, y
   lo terminaba solo el 14% de los que lo empezaban. El celular sobraba: el
   botón abre WhatsApp, así que la persona escribe desde su propio teléfono
   y el número llega igual. */

let destSeleccionado = null;
var cotizacionEmpezada = false;

const FORM_HTML = `
      <div class="cq-group">
        <label class="cq-label">¿A dónde querés ir?</label>
        <div class="cq-dest-grid">
          <button class="cq-dest-btn" onclick="selectDest(this,'Orlando')" data-dest="Orlando">
            <span class="cq-dest-icon">🏰</span>
            <span class="cq-dest-name">Orlando</span>
          </button>
          <button class="cq-dest-btn" onclick="selectDest(this,'París')" data-dest="París">
            <span class="cq-dest-icon">🥐</span>
            <span class="cq-dest-name">París</span>
          </button>
          <button class="cq-dest-btn" onclick="selectDest(this,'Crucero')" data-dest="Crucero">
            <span class="cq-dest-icon">🚢</span>
            <span class="cq-dest-name">Crucero</span>
          </button>
        </div>
      </div>

      <div class="cq-group">
        <label class="cq-label" for="cq-quienes">¿Quiénes van?</label>
        <select class="cq-select" id="cq-quienes">
          <option value="">Seleccioná</option>
          <option>1 persona</option>
          <option>2 adultos</option>
          <option>2 adultos + 1 menor</option>
          <option>2 adultos + 2 menores</option>
          <option>2 adultos + 3 menores</option>
          <option>3 adultos</option>
          <option>4 adultos</option>
          <option>Familia más grande o grupo</option>
        </select>
      </div>

      <div class="cq-group">
        <label class="cq-label" for="cq-cuando">¿Cuándo, más o menos?</label>
        <select class="cq-select" id="cq-cuando"></select>
      </div>

      <button class="cq-submit" onclick="enviarCotizacion()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.136 1.535 5.874L.057 23.882a.5.5 0 0 0 .61.61l6.008-1.478A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a10 10 0 0 1-5.13-1.406l-.367-.22-3.566.878.893-3.458-.24-.377A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
        Pedir mi presupuesto
      </button>
      <p class="cq-aclara">Se abre tu WhatsApp con el mensaje ya escrito.
         No se manda nada hasta que vos toques enviar.</p>
`;

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
               'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/* Los meses se arman solos desde el mes que viene, así la lista nunca queda
   vieja. Llegan hasta 18 meses adelante: un año para planearlo con tiempo,
   más medio año de aire. Más lejos que eso no hay precio que valga. */
function llenarCuando() {
  const sel = document.getElementById('cq-cuando');
  if (!sel) return;
  const hoy = new Date();
  let html = '<option value="">Seleccioná</option>';
  for (let i = 1; i <= 18; i++) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth() + i, 1);
    const nombre = MESES[d.getMonth()];
    html += '<option>' + nombre.charAt(0).toUpperCase() + nombre.slice(1) +
            ' ' + d.getFullYear() + '</option>';
  }
  html += '<option>Todavía no sé</option>';
  sel.innerHTML = html;
}

(function () {
  var cont = document.getElementById('form-cotiza');
  if (cont) {
    cont.innerHTML = FORM_HTML;
    llenarCuando();
  }
})();

function selectDest(btn, dest) {
  document.querySelectorAll('.cq-dest-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  destSeleccionado = dest;

  /* Primer toque del formulario. Comparado contra enviar_cotizacion dice
     cuánta gente lo empieza y lo abandona a mitad de camino. */
  if (!cotizacionEmpezada) {
    cotizacionEmpezada = true;
    if (typeof gtag === 'function') gtag('event', 'iniciar_cotizacion', { destino: dest });
  }
}

function enviarCotizacion() {
  const quienes = document.getElementById('cq-quienes').value;
  const cuando = document.getElementById('cq-cuando').value;

  if (!destSeleccionado) { alert('Por favor elegí un destino 🏰'); return; }
  if (!quienes) { alert('Por favor contame quiénes van'); return; }

  let msg = `Hola Sofi! Quiero cotizar un viaje:\n\n`;
  msg += `• Destino: ${destSeleccionado}\n`;
  msg += `• Quiénes: ${quienes}\n`;
  if (cuando) msg += `• Cuándo: ${cuando}\n`;

  if (typeof gtag === 'function') {
    gtag('event', 'enviar_cotizacion', {
      destino: destSeleccionado,
      quienes: quienes,
      cuando: cuando || '(sin definir)'
    });
  }

  window.open(`https://wa.me/5491132924274?text=${encodeURIComponent(msg)}`, '_blank');
}
