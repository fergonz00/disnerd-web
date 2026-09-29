// ═══ 🎩 EL SOMBRERO SELECCIONADOR — test de casa de Hogwarts ═══
// Inspirado en el test original de Pottermore (sus 28 preguntas, adaptadas al voseo)
// + preguntas nuevas. Cada opción suma puntos a una o más casas (G/R/H/S).
// Partida = 20 preguntas: 2 "binarias" (la 1ª siempre es una, como en Pottermore)
// + 5 de valores + 6 dilemas + 7 de elección. Opciones mezcladas.
// SH_CAL = offsets calibrados por simulación para que las 4 casas salgan parejas.
// ⚠️ Si se tocan preguntas o puntajes hay que recalibrar (tools/calibrar-sombrero.js).
const SH_CASAS = {
  G: { nombre:'Gryffindor', emoji:'🦁', grad:['#f4c4b8','#f3dea2'], color:'#a8322a',
       rasgo:'mucho coraje', lema:'Valentía, osadía y un corazón que no sabe quedarse de brazos cruzados',
       desc:'Donde otros dudan, vos das el paso. No es que no tengas miedo: es que no lo dejás decidir por vos. Defendés a quien lo necesita aunque te juegues el cuello, decís lo que pensás de frente y te encienden las causas justas. A veces te tirás a la pileta sin mirar si hay agua… pero casi siempre la hay, porque tu valentía contagia.',
       datos:{ Fundador:'Godric Gryffindor', Animal:'León', Colores:'Escarlata y dorado', Elemento:'Fuego', Fantasma:'Nick Casi Decapitado', 'Jefa de casa':'Minerva McGonagall', 'Sala común':'En una torre, detrás del retrato de la Señora Gorda' },
       famosos:'Harry Potter, Hermione Granger, Ron Weasley, Albus Dumbledore y Neville Longbottom',
       costado:'ese costado Gryffindor que te hace saltar cuando algo es injusto',
       susurros:['Mmm… acá hay coraje, y del bueno.','Veo a alguien que no se queda mirando desde afuera…'] },
  R: { nombre:'Ravenclaw', emoji:'🦅', grad:['#bfd2ef','#e6d3b3'], color:'#2a4a8a',
       rasgo:'una mente brillante', lema:'Ingenio, sabiduría y una curiosidad que no se apaga nunca',
       desc:'Tu cabeza no para: preguntás el porqué de todo, conectás ideas que a nadie se le ocurren y disfrutás aprender por el puro placer de entender. Sos de las personas que ven el mundo un poco distinto — y eso, lejos de ser raro, es tu superpoder. Te importa más la verdad que tener razón, y tu creatividad encuentra salidas donde los demás ven paredes.',
       datos:{ Fundadora:'Rowena Ravenclaw', Animal:'Águila', Colores:'Azul y bronce', Elemento:'Aire', Fantasma:'La Dama Gris', 'Jefe de casa':'Filius Flitwick', 'Sala común':'En una torre; para entrar hay que responder la adivinanza de un aldabón con forma de águila' },
       famosos:'Luna Lovegood, Cho Chang, Garrick Ollivander y Filius Flitwick',
       costado:'ese costado Ravenclaw que siempre quiere entender un poquito más',
       susurros:['Qué mente inquieta… interesante, muy interesante.','Veo sed de saber. Mucha sed de saber…'] },
  H: { nombre:'Hufflepuff', emoji:'🦡', grad:['#f7e3a0','#ddd6c8'], color:'#8a6a10',
       rasgo:'un corazón leal', lema:'Lealtad, justicia y el trabajo hecho con el corazón',
       desc:'Sos la persona a la que todos llaman cuando las cosas se complican. Leal hasta la médula, justo aunque nadie esté mirando y trabajador de los que no aflojan. No necesitás brillar para que te vean: tu fuerza está en ser constante, en no dejar a nadie atrás y en hacer las cosas bien. Y ojo, que la gente buena también sabe plantarse — nunca subestimen a un tejón.',
       datos:{ Fundadora:'Helga Hufflepuff', Animal:'Tejón', Colores:'Amarillo y negro', Elemento:'Tierra', Fantasma:'El Fraile Gordo', 'Jefa de casa':'Pomona Sprout', 'Sala común':'En el subsuelo, al lado de las cocinas; se entra golpeando un barril con el ritmo justo' },
       famosos:'Cedric Diggory, Newt Scamander, Nymphadora Tonks y Pomona Sprout',
       costado:'ese costado Hufflepuff que nunca deja a nadie atrás',
       susurros:['Mmm… un corazón que no suelta a los suyos.','Veo lealtad. De la que ya no se consigue…'] },
  S: { nombre:'Slytherin', emoji:'🐍', grad:['#bfe0c8','#dfe3e8'], color:'#1f5a3a',
       rasgo:'mucha ambición', lema:'Ambición, astucia y la determinación de llegar lejos',
       desc:'Sabés lo que querés y tenés el ingenio para conseguirlo. Pensás dos jugadas adelante, leés a la gente de un vistazo y no te conformás con lo que te tocó: vas por más. Tu grupo es chico, pero por ellos movés cielo y tierra. Y no, no todos los Slytherin son villanos: también es la casa de Merlín, el mago más grande de todos los tiempos.',
       datos:{ Fundador:'Salazar Slytherin', Animal:'Serpiente', Colores:'Verde y plata', Elemento:'Agua', Fantasma:'El Barón Sanguinario', 'Jefe de casa':'Severus Snape (después, Horace Slughorn)', 'Sala común':'En las mazmorras, debajo del Lago Negro: las ventanas dan al agua' },
       famosos:'Merlín, Severus Snape, Horace Slughorn y Regulus Black',
       costado:'ese costado Slytherin que sabe exactamente adónde quiere llegar',
       susurros:['Mmm… veo ambición. Y la astucia para acompañarla.','Alguien que piensa dos jugadas adelante… interesante.'] },
};
const SH_ORDEN = ['G','R','H','S'];

// tipo: bin = binaria (abre la partida) · val = valores · dil = dilema · ele = elección
// p = puntos por casa. Las marcadas (PM) son adaptaciones del test original de Pottermore.
const SH_PREGUNTAS = [
  /* ───── BINARIAS ───── */
  { tipo:'bin', q:'¿Amanecer o anochecer?', ops:[ {e:'🌅',t:'Amanecer',p:{G:2,R:2}}, {e:'🌆',t:'Anochecer',p:{H:2,S:2}} ] }, // PM
  { tipo:'bin', q:'¿Bosque o río?', ops:[ {e:'🌲',t:'Bosque',p:{G:2,H:2}}, {e:'🏞️',t:'Río',p:{R:2,S:2}} ] }, // PM
  { tipo:'bin', q:'¿Luna o estrellas?', ops:[ {e:'🌙',t:'Luna',p:{R:2,H:2}}, {e:'✨',t:'Estrellas',p:{G:2,S:2}} ] }, // PM
  { tipo:'bin', q:'¿Blanco o negro?', ops:[ {e:'⚪',t:'Blanco',p:{G:2,H:2}}, {e:'⚫',t:'Negro',p:{R:2,S:2}} ] }, // PM
  { tipo:'bin', q:'¿Izquierda o derecha?', ops:[ {e:'⬅️',t:'Izquierda',p:{R:2,H:2}}, {e:'➡️',t:'Derecha',p:{G:2,S:2}} ] }, // PM
  { tipo:'bin', q:'¿Cara o cruz?', ops:[ {e:'🪙',t:'Cara',p:{G:2,R:2}}, {e:'✖️',t:'Cruz',p:{H:2,S:2}} ] }, // PM
  { tipo:'bin', q:'¿Fuego o agua?', ops:[ {e:'🔥',t:'Fuego',p:{G:3,H:1}}, {e:'💧',t:'Agua',p:{S:3,R:1}} ] },
  { tipo:'bin', q:'¿Tormenta o calma?', ops:[ {e:'⛈️',t:'Tormenta',p:{G:2,S:2}}, {e:'🍃',t:'Calma',p:{R:2,H:2}} ] },
  { tipo:'bin', q:'¿Mapa o brújula?', ops:[ {e:'🗺️',t:'Mapa',p:{R:2,S:2}}, {e:'🧭',t:'Brújula',p:{G:2,H:2}} ] },
  { tipo:'bin', q:'¿Castillo o cabaña?', ops:[ {e:'🏰',t:'Castillo',p:{S:2,G:2}}, {e:'🛖',t:'Cabaña',p:{H:2,R:2}} ] },

  /* ───── VALORES ───── */
  { tipo:'val', q:'¿Qué preferirías que la gente sienta por vos?', ops:[ // PM
    {e:'💛',t:'Cariño: que te quieran',p:{H:3,G:1}},
    {e:'🪞',t:'Que te imiten',p:{R:3}},
    {e:'😏',t:'Que te envidien',p:{S:3}},
    {e:'🤝',t:'Que confíen ciegamente en vos',p:{H:2,G:2}},
    {e:'👏',t:'Que te admiren',p:{G:2,S:1}},
    {e:'😶‍🌫️',t:'Que te teman… aunque sea un poquito',p:{S:3,G:1}} ] },
  { tipo:'val', q:'¿Cómo te gustaría que te recuerde la historia?', ops:[ // PM
    {e:'📜',t:'Por tu sabiduría',p:{R:3,H:1}},
    {e:'🕊️',t:'Por tu bondad',p:{H:3}},
    {e:'👑',t:'Por tu grandeza',p:{S:3,R:1}},
    {e:'⚔️',t:'Por tu valentía',p:{G:3}} ] },
  { tipo:'val', q:'Podés inventar una poción que te garantice una sola cosa para toda la vida. ¿Cuál?', ops:[ // PM
    {e:'💞',t:'Amor',p:{H:3,G:1}},
    {e:'🏆',t:'Gloria',p:{G:2,S:2}},
    {e:'🦉',t:'Sabiduría',p:{R:3}},
    {e:'⚡',t:'Poder',p:{S:3}} ] },
  { tipo:'val', q:'¿Qué es lo que más odiarías que dijeran de vos?', ops:[ // PM
    {e:'😐',t:'Que sos del montón',p:{S:3,R:1}},
    {e:'🙈',t:'Que sos ignorante',p:{R:3}},
    {e:'🐔',t:'Que sos cobarde',p:{G:3}},
    {e:'🙅',t:'Que sos egoísta',p:{H:3}} ] },
  { tipo:'val', q:'Dentro de cien años, alguien escucha tu nombre. ¿Qué te gustaría que hiciera?', ops:[ // PM
    {e:'🥲',t:'Que te extrañe, pero con una sonrisa',p:{H:3}},
    {e:'📖',t:'Que pida más historias de tus aventuras',p:{G:3}},
    {e:'🏛️',t:'Que piense con admiración en todo lo que lograste',p:{R:2,S:2}},
    {e:'🤷',t:'Me da igual: me importa lo que piensen de mí ahora',p:{S:3}} ] },
  { tipo:'val', q:'¿Qué es lo que peor llevás?', ops:[ // PM
    {e:'🍽️',t:'El hambre',p:{H:2,G:1}},
    {e:'🥶',t:'El frío',p:{R:1,H:1}},
    {e:'👻',t:'Que te ignoren',p:{S:3}},
    {e:'🥱',t:'El aburrimiento',p:{G:2,R:1}},
    {e:'🫥',t:'La soledad',p:{H:3}} ] },
  { tipo:'val', q:'Para vos, ¿qué hace grande a un equipo?', ops:[
    {e:'🫂',t:'Que nadie quede afuera',p:{H:3}},
    {e:'🧠',t:'Que tenga un plan que nadie vio venir',p:{R:2,S:1}},
    {e:'🥇',t:'Que gane. Para eso se juega',p:{S:3}},
    {e:'🔥',t:'Que se anime a lo que nadie se anima',p:{G:3}} ] },
  { tipo:'val', q:'Un genio te concede un deseo, pero con letra chica: nada de pedir más deseos. ¿Qué pedís?', ops:[
    {e:'❓',t:'Saber la respuesta a cualquier pregunta',p:{R:3}},
    {e:'🛡️',t:'Que la gente que querés nunca sufra',p:{H:3,G:1}},
    {e:'📣',t:'Que cuando hables, todos te escuchen',p:{S:3}},
    {e:'🗺️',t:'Una aventura que nadie haya vivido nunca',p:{G:3}} ] },
  { tipo:'val', q:'¿Qué frase te define más?', ops:[
    {e:'🛠️',t:'"Lo que sea, pero bien hecho"',p:{H:2,R:1}},
    {e:'🎲',t:'"El que no arriesga, no gana"',p:{G:3,S:1}},
    {e:'🤔',t:'"Pensalo dos veces"',p:{R:3}},
    {e:'♟️',t:'"El fin justifica los medios… casi siempre"',p:{S:3}},
    {e:'🙌',t:'"Si vamos, vamos todos"',p:{H:2,G:1}} ] },
  { tipo:'val', q:'¿De qué te sentís más orgullo?', ops:[
    {e:'🛡️',t:'De haber defendido a alguien cuando nadie lo hacía',p:{G:3,H:1}},
    {e:'💡',t:'De algo que aprendiste sin que nadie te lo enseñe',p:{R:3}},
    {e:'🧗',t:'De haber llegado lejos cuando nadie apostaba por vos',p:{S:3,G:1}},
    {e:'📞',t:'De que tus amigos saben que siempre estás',p:{H:3}} ] },
  { tipo:'val', q:'¿Qué te molesta más en otra persona?', ops:[
    {e:'🐑',t:'Que no tenga opinión propia',p:{R:2,G:1}},
    {e:'🎭',t:'Que sea falsa',p:{H:2,G:1}},
    {e:'🐢',t:'Que no tenga ambición ninguna',p:{S:3}},
    {e:'🙊',t:'Que se quede callada ante una injusticia',p:{G:3}},
    {e:'🗑️',t:'Que no cumpla lo que promete',p:{H:3}} ] },

  /* ───── DILEMAS ───── */
  { tipo:'dil', q:'Es de noche, caminás por una calle vacía y escuchás un grito extraño que claramente tiene origen mágico. ¿Qué hacés?', ops:[ // PM
    {e:'🤚',t:'Sigo con cuidado, con una mano en la varita y atención a todo',p:{H:2,R:1}},
    {e:'🔦',t:'Saco la varita y voy a buscar de dónde viene',p:{G:3}},
    {e:'🧍',t:'Saco la varita y me planto donde estoy',p:{R:2,G:1}},
    {e:'🌑',t:'Me meto en las sombras a ver qué pasa antes de mover un dedo',p:{S:3,R:1}} ] },
  { tipo:'dil', q:'Alguien de tu casa usó una Pluma Autocorrectora en un examen y te ganó el primer puesto en Encantamientos. El profesor Flitwick sospecha y te pregunta a vos. ¿Qué hacés?', ops:[ // PM
    {e:'🤐',t:'Miento y digo que no sé nada',p:{H:2,S:1}},
    {e:'↩️',t:'Le digo que se lo pregunte a él… y después le aviso que si no confiesa, lo cuento yo',p:{H:3,G:1}},
    {e:'⚖️',t:'Le digo la verdad: si hizo trampa para ganar, que se haga cargo',p:{R:3}},
    {e:'🚪',t:'Ni espero a que me pregunte: voy yo a contárselo',p:{G:2,S:1}} ] },
  { tipo:'dil', q:'Una persona sin magia (un muggle) te encara y te dice que está segura de que sos mago o bruja. ¿Qué hacés?', ops:[ // PM
    {e:'🧐',t:'Le pregunto qué le hace pensar eso',p:{R:3}},
    {e:'🪄',t:'Le digo que sí y le ofrezco una muestra gratis de un embrujo',p:{G:2,S:1}},
    {e:'😎',t:'Le digo que sí y me voy, dejándole la duda de si era chamuyo',p:{S:2,G:1}},
    {e:'🩺',t:'Le digo que me preocupa su salud y le ofrezco llamar a un médico',p:{R:2,S:1}} ] },
  { tipo:'dil', q:'Con dos amigos tienen que cruzar un puente custodiado por un trol que exige pelear con uno de ustedes antes de dejarlos pasar. ¿Qué hacés?', ops:[ // PM
    {e:'🌀',t:'Intento confundirlo para que pasemos los tres sin pelear',p:{R:3,S:1}},
    {e:'🎟️',t:'Propongo sortear quién pelea',p:{H:3}},
    {e:'🤫',t:'Propongo pelear los tres juntos… sin avisarle al trol',p:{S:3,G:1}},
    {e:'🙋',t:'Me ofrezco a pelear',p:{G:3}} ] },
  { tipo:'dil', q:'Un trol enloquecido está destrozando el despacho del director. Llegás a salvar una sola cosa antes de que la aplaste. ¿Cuál?', ops:[ // PM
    {e:'🧪',t:'Una cura para la viruela de dragón que está casi terminada',p:{H:3,G:1}},
    {e:'🗃️',t:'Los registros de todos los alumnos de los últimos mil años',p:{R:2,S:1}},
    {e:'📕',t:'Un libro manuscrito lleno de runas que nadie pudo descifrar',p:{R:3}},
    {e:'🗡️',t:'La espada de Gryffindor',p:{G:3}} ] },
  { tipo:'dil', q:'En un partido de Quidditch tu equipo pierde por poco. Hay una jugada que no está prohibida… pero tampoco es muy noble. ¿La usás?', ops:[
    {e:'✅',t:'Obvio: si no está prohibida, vale',p:{S:3}},
    {e:'🙅',t:'No. Prefiero perder limpio',p:{H:3}},
    {e:'🧩',t:'Busco otra jugada que a nadie se le ocurrió',p:{R:3}},
    {e:'🟡',t:'Me tiro de cabeza a buscar la Snitch aunque me juegue el cuello',p:{G:3}} ] },
  { tipo:'dil', q:'Encontrás la Sección Prohibida de la biblioteca sin nadie cuidándola. ¿Qué hacés?', ops:[
    {e:'🏃',t:'Entro. Ya. Después vemos',p:{G:3}},
    {e:'📝',t:'Me anoto el horario y vuelvo con un plan',p:{S:2,R:1}},
    {e:'📚',t:'Entro, pero directo a ese libro que venía queriendo leer',p:{R:3}},
    {e:'🔔',t:'Le aviso a alguien: un chico de primero podría meterse y lastimarse',p:{H:3}} ] },
  { tipo:'dil', q:'Alguien de tu grupo te confiesa algo grave que hizo y te pide que no digas nada. ¿Qué hacés?', ops:[
    {e:'🔒',t:'Le guardo el secreto, pase lo que pase',p:{H:3,S:1}},
    {e:'👣',t:'Lo acompaño a arreglarlo, aunque le cueste',p:{G:3,H:1}},
    {e:'🔍',t:'Primero entiendo bien qué pasó antes de decidir nada',p:{R:3}},
    {e:'🗝️',t:'Le guardo el secreto… y lo tengo presente por si algún día me sirve',p:{S:3}} ] },
  { tipo:'dil', q:'Te ofrecen un cargo importante en el colegio, pero te va a quitar muchas tardes con tus amigos. ¿Qué hacés?', ops:[
    {e:'🎖️',t:'Acepto: las oportunidades no se regalan',p:{S:3}},
    {e:'🔧',t:'Acepto, si me deja cambiar algo que está mal',p:{G:2,H:1}},
    {e:'💬',t:'Lo rechazo: primero mis amigos',p:{H:3}},
    {e:'🗂️',t:'Acepto: tener acceso a más información me viene bárbaro',p:{R:2,S:1}} ] },
  { tipo:'dil', q:'En un duelo de práctica tu rival se tropieza y queda en el piso, sin varita. ¿Qué hacés?', ops:[
    {e:'🤲',t:'Le doy la mano para que se levante',p:{H:3}},
    {e:'✋',t:'Espero a que recupere la varita: así no vale',p:{G:3}},
    {e:'⚡',t:'Aprovecho. Un duelo es un duelo',p:{S:3}},
    {e:'🧐',t:'Aprovecho la pausa para preguntarle qué hechizo usó antes',p:{R:3}} ] },
  { tipo:'dil', q:'Te perdés en el Bosque Prohibido y se está haciendo de noche. ¿Qué hacés?', ops:[
    {e:'💧',t:'Sigo el ruido del agua: los ríos siempre llevan a algún lado',p:{R:3}},
    {e:'🫂',t:'Busco a los demás: sin mi grupo no me voy',p:{H:3}},
    {e:'🎇',t:'Tiro chispas rojas y enfrento lo que venga',p:{G:3}},
    {e:'🌫️',t:'Me escondo en silencio hasta ver quién aparece',p:{S:3}} ] },
  { tipo:'dil', q:'En el Gran Comedor alguien se burla de un alumno de primer año. ¿Qué hacés?', ops:[
    {e:'🗯️',t:'Me paro y le digo de todo',p:{G:3}},
    {e:'🍰',t:'Me siento al lado del de primero y le hago charla',p:{H:3}},
    {e:'🎯',t:'Le contesto con una frase tan precisa que queda en ridículo',p:{R:2,S:1}},
    {e:'📌',t:'No digo nada… pero me lo anoto. Algún día se la devuelvo',p:{S:3}} ] },
  { tipo:'dil', q:'Descubrís un hechizo que te haría sacar la nota perfecta sin que el profesor se dé cuenta. ¿Qué hacés?', ops:[
    {e:'📘',t:'No lo uso: quiero saber de verdad',p:{R:3}},
    {e:'⚖️',t:'No lo uso: no sería justo para los demás',p:{H:3}},
    {e:'🤏',t:'Lo uso, pero solo en esa materia que no me importa nada',p:{S:3}},
    {e:'📢',t:'Lo comparto con todo el curso, así estamos parejos',p:{G:2,H:1}} ] },
  { tipo:'dil', q:'Hay que elegir capitán del equipo de Quidditch y dudan entre vos y alguien con más experiencia. ¿Qué hacés?', ops:[
    {e:'💪',t:'Me presento igual: lo que no sé, lo aprendo',p:{G:3}},
    {e:'🤝',t:'Le cedo el lugar: lo va a hacer mejor, y el equipo es primero',p:{H:3}},
    {e:'📊',t:'Propongo una prueba justa para decidir',p:{R:3}},
    {e:'🗳️',t:'Hago campaña. El puesto es mío',p:{S:3}} ] },
  { tipo:'dil', q:'Las escaleras de Hogwarts se movieron y terminás en un pasillo que no conocías. ¿Qué hacés?', ops:[
    {e:'🚶',t:'Lo recorro entero: seguro hay algo interesante',p:{G:3}},
    {e:'🔢',t:'Busco el patrón: las escaleras no se mueven porque sí',p:{R:3}},
    {e:'🚪',t:'Golpeo la primera puerta y pregunto cómo volver',p:{H:3}},
    {e:'🤫',t:'Anoto el camino: un atajo que nadie conoce vale oro',p:{S:3}} ] },

  /* ───── ELECCIÓN ───── */
  { tipo:'ele', q:'¿Qué camino te tienta más?', ops:[ // PM
    {e:'🌻',t:'El sendero ancho, soleado y lleno de pasto',p:{H:3}},
    {e:'🏮',t:'El callejón angosto y oscuro, iluminado con faroles',p:{S:3}},
    {e:'🍂',t:'El caminito que serpentea entre árboles y hojas secas',p:{G:3}},
    {e:'🏛️',t:'La calle empedrada, con edificios antiquísimos',p:{R:3}} ] },
  { tipo:'ele', q:'¿Qué pesadilla te asustaría más?', ops:[ // PM
    {e:'🧗',t:'Estar en lo alto de algo y darte cuenta de que no hay de dónde agarrarte',p:{G:2,R:1}},
    {e:'👁️',t:'Un ojo espiando por la cerradura de una habitación oscura y sin ventanas donde no podés salir',p:{R:2,S:1}},
    {e:'😶',t:'Despertarte y que ni tu familia ni tus amigos sepan quién sos',p:{H:3}},
    {e:'🤡',t:'Tener que hablar con una voz tan ridícula que nadie te entienda y todos se rían',p:{S:3}} ] },
  { tipo:'ele', q:'¿Qué instrumento te gusta más escuchar?', ops:[ // PM
    {e:'🎻',t:'El violín',p:{S:3}},
    {e:'🎺',t:'La trompeta',p:{H:3}},
    {e:'🎹',t:'El piano',p:{R:3}},
    {e:'🥁',t:'El tambor',p:{G:3}} ] },
  { tipo:'ele', q:'Entrás a un jardín encantado. ¿Qué querés investigar primero?', ops:[ // PM
    {e:'🍎',t:'El árbol de hojas plateadas que da manzanas de oro',p:{G:2,S:1}},
    {e:'🍄',t:'Los hongos rojos y gordos que parecen estar charlando entre ellos',p:{H:3}},
    {e:'🫧',t:'El estanque burbujeante, en cuyo fondo gira algo luminoso',p:{S:2,R:1}},
    {e:'🗿',t:'La estatua de un viejo mago con un ojo que parece guiñarte',p:{R:3}} ] },
  { tipo:'ele', q:'Frente a vos hay cuatro cajas. ¿Cuál abrís?', ops:[ // PM
    {e:'🐢',t:'La cajita de carey con detalles de oro, de la que sale un chillido de alguna criatura',p:{H:3}},
    {e:'🖤',t:'La caja negra brillante con cerradura de plata y la runa de Merlín grabada',p:{S:3}},
    {e:'📦',t:'El cofre dorado con patas de garra que advierte: adentro hay saber secreto y una tentación insoportable',p:{R:3,S:1}},
    {e:'🪙',t:'La caja de peltre, simple y sin adornos, que dice rayado: "Solo me abro para quien lo merece"',p:{G:3}} ] },
  { tipo:'ele', q:'Te ponen cuatro copas adelante. ¿Cuál tomás?', ops:[ // PM
    {e:'🥂',t:'La espumosa y plateada, que brilla como si tuviera polvo de diamante',p:{R:3}},
    {e:'🍷',t:'La espesa y violeta, con aroma a chocolate y ciruelas',p:{H:3}},
    {e:'🌞',t:'La dorada, tan brillante que duele mirarla y llena el cuarto de destellos',p:{G:3}},
    {e:'🖋️',t:'La negra como la tinta, que larga unos vapores que te hacen ver visiones',p:{S:3}} ] },
  { tipo:'ele', q:'Una vez por siglo, el Arbusto Flutterby da flores que toman el aroma que más te atrae. ¿A qué olería para vos?', ops:[ // PM
    {e:'🪵',t:'A leña crepitando en un hogar',p:{G:3}},
    {e:'🌊',t:'Al mar',p:{S:3}},
    {e:'📜',t:'A pergamino nuevo',p:{R:3}},
    {e:'🏡',t:'A casa',p:{H:3}} ] },
  { tipo:'ele', q:'Si pudieras tener un solo poder, ¿cuál elegirías?', ops:[ // PM
    {e:'🧠',t:'Leer la mente',p:{S:2,R:1}},
    {e:'🫥',t:'Ser invisible',p:{G:2,S:1}},
    {e:'💪',t:'Fuerza sobrehumana',p:{G:2,H:1}},
    {e:'🐾',t:'Hablar con los animales',p:{H:3}},
    {e:'⏳',t:'Cambiar el pasado',p:{R:2,H:1}},
    {e:'🎭',t:'Cambiar tu apariencia cuando quieras',p:{S:2,R:1}} ] },
  { tipo:'ele', q:'¿Qué criatura te gustaría estudiar?', ops:[ // PM
    {e:'🏹',t:'Centauros',p:{R:3}},
    {e:'💰',t:'Duendes (los de Gringotts)',p:{S:2,R:1}},
    {e:'🧜',t:'Sirenas',p:{H:2,R:1}},
    {e:'👻',t:'Fantasmas',p:{R:2,H:1}},
    {e:'🧛',t:'Vampiros',p:{S:2,G:1}},
    {e:'🐺',t:'Hombres lobo',p:{G:3}},
    {e:'🧌',t:'Trols',p:{G:1,H:2}} ] },
  { tipo:'ele', q:'¿Qué es lo que más te entusiasma aprender en Hogwarts?', ops:[ // PM
    {e:'💨',t:'Aparecerme y desaparecerme',p:{S:2,G:1}},
    {e:'🐈',t:'Transformaciones',p:{R:3}},
    {e:'🧹',t:'Volar en escoba',p:{G:3}},
    {e:'🌀',t:'Maleficios y embrujos',p:{S:3}},
    {e:'🦄',t:'Todo sobre criaturas mágicas',p:{H:3}},
    {e:'🕯️',t:'Los secretos del castillo',p:{G:2,R:1}},
    {e:'🌈',t:'Todas las ramas de la magia que pueda',p:{R:2,H:1}} ] },
  { tipo:'ele', q:'En lo de Ollivander te ofrecen cuatro varitas (aunque la varita elige al mago…). ¿Cuál te llama?', ops:[
    {e:'🪶',t:'Acebo y pluma de fénix: impulsiva, fiel, siempre lista para el peligro',p:{G:3}},
    {e:'🐉',t:'Tejo y fibra de corazón de dragón: poderosa y algo temperamental',p:{S:3}},
    {e:'🦄',t:'Sauce y pelo de unicornio: noble, estable, imposible de corromper',p:{H:3}},
    {e:'✒️',t:'Nogal y pluma de fénix: precisa, sensible a cada idea nueva',p:{R:3}} ] },
  { tipo:'ele', q:'Tarde de lluvia en Hogwarts. ¿Dónde te encontramos?', ops:[
    {e:'📚',t:'En la biblioteca',p:{R:3}},
    {e:'🥧',t:'En las cocinas: los elfos siempre convidan algo',p:{H:3}},
    {e:'🌧️',t:'En el campo de Quidditch, aunque llueva',p:{G:3}},
    {e:'🌊',t:'En las mazmorras, mirando el Lago Negro por la ventana',p:{S:3}},
    {e:'🔭',t:'En la Torre de Astronomía',p:{R:2,G:1}} ] },
  { tipo:'ele', q:'Llegás al Callejón Diagon con 50 galeones en el bolsillo. ¿Adónde entrás primero?', ops:[
    {e:'📖',t:'A Flourish y Blotts, la librería',p:{R:3}},
    {e:'🎆',t:'A Sortilegios Weasley',p:{G:2,H:1}},
    {e:'🕯️',t:'A Borgin y Burkes, en el Callejón Knockturn',p:{S:3}},
    {e:'🍦',t:'A la heladería Florean Fortescue, a invitar a todos',p:{H:3}},
    {e:'🧹',t:'A Artículos de Calidad para Quidditch',p:{G:3}} ] },
  { tipo:'ele', q:'Podés quedarte con un solo objeto mágico. ¿Cuál?', ops:[
    {e:'🪄',t:'La Varita de Saúco',p:{S:3}},
    {e:'🧥',t:'La Capa de Invisibilidad',p:{H:2,G:1}},
    {e:'⌛',t:'Un Giratiempo',p:{R:3}},
    {e:'🗺️',t:'El Mapa del Merodeador',p:{G:3}},
    {e:'🫙',t:'Un Pensadero',p:{R:2,S:1}} ] },
  { tipo:'ele', q:'Te parás frente al Espejo de Oesed. ¿Qué ves?', ops:[
    {e:'👨‍👩‍👧‍👦',t:'A toda la gente que querés, junta y feliz',p:{H:3}},
    {e:'📚',t:'Una biblioteca con la respuesta a todo',p:{R:3}},
    {e:'🦸',t:'A tu versión más valiente haciendo algo increíble',p:{G:3}},
    {e:'🏔️',t:'A vos en la cima, con todo el mundo escuchándote',p:{S:3}} ] },
  { tipo:'ele', q:'Conjurás tu Patronus por primera vez. ¿Cómo te gustaría que fuera?', ops:[
    {e:'🐻',t:'Grande y fuerte',p:{G:3}},
    {e:'🐕',t:'Fiel: que nunca se aleje',p:{H:3}},
    {e:'🦊',t:'Veloz y astuto',p:{S:3}},
    {e:'🦓',t:'Raro, uno que nadie haya visto',p:{R:3}} ] },
  { tipo:'ele', q:'Entrás a Honeydukes. ¿Qué te llevás?', ops:[
    {e:'🫘',t:'Grageas de Todos los Sabores: me la juego',p:{G:3}},
    {e:'🐸',t:'Ranas de Chocolate: colecciono las figuritas',p:{R:3}},
    {e:'🍫',t:'Una bolsa gigante de Calderos de Chocolate para compartir',p:{H:3}},
    {e:'🪶',t:'Plumas de azúcar, para comer en clase sin que nadie se dé cuenta',p:{S:3}} ] },
  { tipo:'ele', q:'¿Qué mascota te llevás a Hogwarts?', ops:[
    {e:'🦉',t:'Una lechuza',p:{R:2,G:1}},
    {e:'🐈‍⬛',t:'Un gato negro',p:{S:3}},
    {e:'🐸',t:'Un sapo',p:{H:3}},
    {e:'🐀',t:'Una rata (sí, una rata)',p:{G:2,H:1}},
    {e:'🐍',t:'Una serpiente, si me dejaran',p:{S:2}} ] },
];

const SH_CUPO = { bin:2, val:5, dil:6, ele:7 }; // = 20 preguntas por partida
const SH_EMPATE = 2;  // si 1º y 2º quedan a ≤ esto, el Sombrero duda y te deja elegir (como a Harry)
const SH_CAL = {"G":0,"R":0,"H":0,"S":0};

function shMezclar(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function shArmarPartida(){
  const por = t => shMezclar(SH_PREGUNTAS.filter(q=>q.tipo===t));
  const bins = por('bin').slice(0, SH_CUPO.bin);
  const resto = shMezclar([...por('val').slice(0,SH_CUPO.val), ...por('dil').slice(0,SH_CUPO.dil), ...por('ele').slice(0,SH_CUPO.ele)]);
  // la 1ª pregunta siempre es binaria (como en Pottermore); la otra cae a mitad de camino
  resto.splice(Math.floor(resto.length/2), 0, ...bins.slice(1));
  return [bins[0], ...resto];
}

function shPuntuar(puntos){
  return SH_ORDEN.map(k=>({ k, pts:(puntos[k]||0) + (SH_CAL[k]||0) })).sort((a,b)=>b.pts-a.pts);
}


// ─── 🎩 SOMBRERO: pantallas ───
var shEstado = null;
function shShow(id){ ['sh-intro','sh-q','sh-calc','sh-duda','sh-res'].forEach(s=>document.getElementById(s).style.display = s===id?'block':'none'); }
function shVolverIntro(){ shEstado=null; shShow('sh-intro'); window.scrollTo(0,0); }

function shStart(){
  if (typeof gtag === 'function') gtag('event', 'sombrero_inicio', {});
  shEstado = { qs: shArmarPartida(), i:0, pts:{G:0,R:0,H:0,S:0} };
  shShow('sh-q');
  shRenderQ();
  window.scrollTo(0,0);
}

function shRenderQ(){
  const s = shEstado, q = s.qs[s.i];
  document.getElementById('sh-num').textContent = `Pregunta ${s.i+1} de ${s.qs.length}`;
  document.getElementById('sh-bar').style.width = `${(s.i/s.qs.length)*100}%`;
  // a un tercio y a dos tercios, el Sombrero murmura lo que va viendo
  let susurro = '';
  if(s.i===7 || s.i===14){
    const lider = shPuntuar(s.pts)[0].k;
    susurro = `<div class="sh-susurro fade-in">🎩 <i>«${SH_CASAS[lider].susurros[s.i===7?0:1]}»</i></div>`;
  }
  const ops = shMezclar(q.ops.map((o,idx)=>({o,idx})));
  document.getElementById('sh-body').innerHTML = susurro +
    `<div class="q-text fade-in">${q.q}</div>` +
    ops.map(({o,idx})=>`<button class="opt fade-in" onclick="shPick(${idx},this)"><span class="opt-emoji">${o.e}</span><span>${o.t}</span></button>`).join('');
}

function shPick(idx, el){
  el.classList.add('sel');
  document.querySelectorAll('#sh-body .opt').forEach(b=>b.onclick=null);
  const s = shEstado, o = s.qs[s.i].ops[idx];
  for(const k in o.p) s.pts[k] += o.p[k];
  setTimeout(()=>{
    s.i++;
    if(s.i < s.qs.length) shRenderQ();
    else shPensar();
  }, 320);
}

// la escena del Sombrero pensando, con lo que ve de tus dos casas más fuertes
function shPensar(){
  const r = shPuntuar(shEstado.pts), a = SH_CASAS[r[0].k], b = SH_CASAS[r[1].k];
  shEstado.ranking = r;
  const lineas = ['Mmm… difícil. Muy difícil.', `Veo ${a.rasgo}… y también ${b.rasgo}.`, '¿Dónde te pongo…?'];
  const txt = document.getElementById('sh-calc-txt');
  shShow('sh-calc'); window.scrollTo(0,0);
  lineas.forEach((l,i)=>setTimeout(()=>{ if(!shEstado) return; txt.innerHTML = `<p class="fade-in">«${l}»</p>`; }, i*1500));
  setTimeout(()=>{
    if(!shEstado) return;
    if(r[0].pts - r[1].pts <= SH_EMPATE) shDuda(r[0].k, r[1].k);
    else shResultado(r[0].k, r[1].k, false);
  }, lineas.length*1500 + 300);
}

// empate: como con Harry, el Sombrero tiene en cuenta lo que vos elegís
function shDuda(k1, k2){
  const par = shMezclar([k1,k2]);
  document.getElementById('sh-duda').innerHTML = `
    <div class="fade-in" style="text-align:center">
      <div class="sh-hat">🎩</div>
      <p class="sh-voz">«No me decido… Tenés tanto de ${SH_CASAS[k1].nombre} como de ${SH_CASAS[k2].nombre}. Esta vez, tu elección también cuenta.»</p>
      <p style="font-weight:700;margin:1.2rem 0 .8rem">¿Adónde querés ir?</p>
      ${par.map(k=>`<button class="modo-card" style="background:linear-gradient(135deg,${SH_CASAS[k].grad[0]},${SH_CASAS[k].grad[1]})" onclick="shResultado('${k}','${k===k1?k2:k1}',true)">
        <span class="m-emoji">${SH_CASAS[k].emoji}</span>
        <span><span class="m-tit">${SH_CASAS[k].nombre}</span><br><span class="m-sub">${SH_CASAS[k].lema}</span></span>
      </button>`).join('')}
    </div>`;
  shShow('sh-duda'); window.scrollTo(0,0);
}

function shResultado(k, k2, elegida){
  const c = SH_CASAS[k], c2 = SH_CASAS[k2];
  if (typeof gtag === 'function') {
    gtag('event', 'sombrero_fin', { casa: c.nombre, desempate: elegida ? 'si' : 'no' });
  }
  const nota = elegida
    ? `Elegiste vos, y el Sombrero te escuchó. Como decía Dumbledore, son nuestras elecciones las que muestran quiénes somos de verdad, mucho más que nuestras habilidades. Igual, ${c2.costado}, no se va a ninguna parte.`
    : `Pero ojo: el Sombrero también vio en vos ${c2.costado}.`;
  document.getElementById('sh-res').innerHTML = `
    <div class="fade-in">
      <div class="sos">El Sombrero Seleccionador exclama…</div>
      <div class="sh-grito" style="color:${c.color}">¡${c.nombre.toUpperCase()}!</div>
      <div class="res-card" style="background:linear-gradient(135deg,${c.grad[0]},${c.grad[1]})">
        <div class="res-emoji">${c.emoji}</div>
        <div class="res-nombre">${c.nombre}</div>
        <div class="res-tag">${c.lema}</div>
      </div>
      <div class="res-desc">${c.desc}<p class="sh-costado">${c2.emoji} ${nota}</p></div>
      <div class="sh-datos">
        ${Object.entries(c.datos).map(([t,v])=>`<div><span>${t}</span>${v}</div>`).join('')}
        <div><span>Compartís casa con</span>${c.famosos}</div>
      </div>
      <p class="sh-disnerd">🧣 Cuando vayas a The Wizarding World of Harry Potter en Universal, ya sabés de qué color es tu bufanda.</p>
      <div class="res-btns">
        <button class="btn-again" onclick="shStart()">Jugar de nuevo 🔄</button>
        <button class="btn-share" onclick="shCompartir('${k}')">Compartir ✨</button>
      </div>
      <button class="btn-menu" onclick="shVolverIntro()">← Volver al principio</button>
      <div class="cta-sofi">
        <div class="cta-tit">¿Y si lo vivís <em>en Universal</em>?</div>
        <p>Soy Sofi, agente de viajes especializada en Disney y Universal. Contame tu viaje soñado y te lo cotizo gratis.</p>
        <a href="https://wa.me/5491132924274?text=${encodeURIComponent(`Hola Sofi! Hice el test del Sombrero en tu página (me tocó ${c.nombre} ${c.emoji}) y quiero cotizar mi viaje`)}" target="_blank">Cotizá tu viaje gratis 💬</a>
      </div>
    </div>`;
  document.getElementById('sh-res').dataset.ganador = JSON.stringify({nombre: c.nombre, emoji: c.emoji});
  shShow('sh-res'); window.scrollTo(0,0);
}

function shCompartir(k){
  const c = SH_CASAS[k];
  if (typeof gtag === 'function') gtag('event', 'sombrero_compartir', { casa: c.nombre });
  const texto = `🎩 El Sombrero Seleccionador de Disnerd me mandó a ${c.nombre} ${c.emoji} ¿Y a vos? 👉 ${(location.host + location.pathname).replace(/\/$/, '')}`;
  if(navigator.share){ navigator.share({ text: texto }).catch(()=>{}); }
  else { navigator.clipboard.writeText(texto).then(()=>alert('¡Resultado copiado! Pegalo donde quieras 💬')); }
}
