/* ═══════════════ A DÓNDE VA DISNEY ═══════════════
   El catálogo de rutas de Disney Cruise Line, con sus salidas.

   FUENTE: el flyer oficial de itinerarios que Disney publica para agentes en
   disneytravelagents.com (Disney Cruise Line → Destinations → "View a flyer
   showing an itinerary overview"), temporada otoño 2027 y primavera 2028. El
   propio PDF aclara: "Itineraries and sail dates are subject to change."

   f: 1  ruta del calendario oficial: trae cuántas salidas y entre qué meses.
   f: 2  fuera de esa temporada (Alaska y Europa navegan en verano) pero
         verificada en la página pública del destino: barco y noches, sin fechas.
   f: 0  sólo el destino. No se le inventa ni barco ni duración.

   NO lleva precios: dependen de la promoción, la fecha, el barco y el
   camarote, así que los pone Sofi. Cómo se rehace: _tools/cruceros_datos.md.

   r=región · d=destino · e=emoji · n=noches · s=puerto · x=escalas
   sal=cuántas salidas · desde/hasta=meses · fin=puerto de llegada
   t/tt=temporada temática · f=si tiene salidas publicadas */
var RUTAS = [
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 3, "s": "Port Canaveral", "b": [], "t": "", "tt": "", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas", "sal": 22, "desde": "nov 2027", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 3, "s": "Port Canaveral", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas", "sal": 8, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 3, "s": "Port Canaveral", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas", "sal": 9, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 4, "s": "Fort Lauderdale o Port Canaveral", "b": [], "t": "", "tt": "", "x": "Disney Castaway Cay • Disney Lookout Cay at Lighthouse Point • One day at sea", "sal": 41, "desde": "nov 2027", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 4, "s": "Port Canaveral", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Nassau, The Bahamas", "sal": 14, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 4, "s": "Port Canaveral", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Castaway Cay • Disney Lookout Cay at Lighthouse Point • One day at sea", "sal": 11, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 5, "s": "Port Canaveral", "b": [], "t": "", "tt": "", "x": "Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Nassau, The Bahamas • One day at sea", "sal": 20, "desde": "nov 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 5, "s": "Port Canaveral", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Nassau, The Bahamas • One day at sea", "sal": 7, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 5, "s": "Port Canaveral", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Castaway Cay • Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas • One day at sea", "sal": 5, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 6, "s": "Fort Lauderdale", "b": [], "t": "", "tt": "", "x": "Two days at Disney Castaway Cay • Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas • One day at sea", "sal": 2, "desde": "ene 2028", "hasta": "ene 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 6, "s": "", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Two days at Disney Castaway Cay • Nassau, The Bahamas • Disney Lookout Cay at Lighthouse Point • One day at sea", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 7, "s": "", "b": [], "t": "", "tt": "", "x": "Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Four days at sea", "sal": 3, "desde": "dic 2027", "hasta": "mar 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 7, "s": "", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas • Four days at sea", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "bermuda", "d": "Bermuda", "e": "🐠", "n": 4, "s": "", "b": [], "t": "", "tt": "", "x": "Bermuda • Two days at sea", "sal": 1, "desde": "sep 2027", "hasta": "sep 2027", "fin": "", "f": 1},
  {"r": "bermuda", "d": "Bermuda", "e": "🐠", "n": 5, "s": "", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "from New York ending in San Juan New York (Embarkation) • Bermuda • Three days at sea • San Juan, PR (Disembarkation)", "sal": 3, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bermuda", "d": "Bermuda", "e": "🐠", "n": 6, "s": "", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Bermuda • Halifax, Nova Scotia • Three days at sea", "sal": 1, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bermuda", "d": "Bermuda", "e": "🐠", "n": 8, "s": "Fort Lauderdale", "b": [], "t": "", "tt": "", "x": "Two days at Bermuda • Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Three days at sea", "sal": 1, "desde": "mar 2028", "hasta": "mar 2028", "fin": "", "f": 1},
  {"r": "canada", "d": "Canadá", "e": "🍁", "n": 5, "s": "", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "St. John, New Brunswick • Boston • Two days at sea", "sal": 1, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "canada", "d": "Canadá", "e": "🍁", "n": 7, "s": "", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Charlottetown, PEI • Sydney, Nova Scotia • Halifax, Nova Scotia • Three days at sea", "sal": 1, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 4, "s": "", "b": [], "t": "", "tt": "", "x": "Progreso, Mexico • Two days at sea", "sal": 7, "desde": "nov 2027", "hasta": "mar 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 4, "s": "", "b": [], "t": "", "tt": "", "x": "from San Juan ending in Port Canaveral San Juan, PR (Embarkation) • Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • One day at sea • Po", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 4, "s": "", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Progreso, Mexico • Two days at sea", "sal": 2, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 5, "s": "Port Canaveral", "b": [], "t": "", "tt": "", "x": "Disney Castaway Cay • Cozumel, Mexico • Two days at sea", "sal": 12, "desde": "sep 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 5, "s": "", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Cozumel, Mexico • Disney Castaway Cay • Two days at sea", "sal": 3, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 5, "s": "Port Canaveral", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Castaway Cay • Cozumel, Mexico • Two days at sea", "sal": 5, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 5, "s": "Port Canaveral", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "from San Juan ending in Fort Lauderdale San Juan, PR (Embarkation) • St Thomas, USVI • Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • ", "sal": 2, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 6, "s": "Port Canaveral", "b": [], "t": "", "tt": "", "x": "Cozumel, Mexico • Grand Cayman, Cayman Islands • Disney Castaway Cay • Two days at sea", "sal": 1, "desde": "ene 2028", "hasta": "ene 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 6, "s": "Fort Lauderdale", "b": [], "t": "", "tt": "", "x": "from San Juan ending in Port Canaveral San Juan, PR (Embarkation) • Philipsburg, St. Maarten • St. Thomas, USVI • Disney Lookout Cay at Lighthouse Poi", "sal": 2, "desde": "abr 2028", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 7, "s": "Fort Lauderdale", "b": [], "t": "", "tt": "", "x": "Bridgetown, Barbados • Castries, St. Lucia • Roseau, Dominica • St. John’s, Antigua and Barbuda • Two days at sea", "sal": 18, "desde": "nov 2027", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 7, "s": "", "b": [], "t": "", "tt": "", "x": "Cozumel, Mexico • Grand Cayman, Cayman Islands • Falmouth, Jamaica • Disney Castaway Cay • Two days at sea", "sal": 9, "desde": "dic 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe sur", "e": "🌴", "n": 7, "s": "", "b": [], "t": "", "tt": "", "x": "Oranjestad, Aruba • Kralendijk, Bonaire • Willemstad, Curacao • Philipsburg, St. Maarten • Two days at sea", "sal": 2, "desde": "nov 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 7, "s": "", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Cozumel, Mexico • Grand Cayman, Cayman Islands • Falmouth, Jamaica • Disney Castaway Cay • Two days at sea", "sal": 3, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 7, "s": "", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Tortola, BVI • St. Thomas, USVI • Disney Castaway Cay • Three days at sea", "sal": 2, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 7, "s": "Port Canaveral", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Cozumel, Mexico • Grand Cayman, Cayman Islands • Falmouth, Jamaica • Disney Castaway Cay • Two days at sea", "sal": 4, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 7, "s": "", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "St. Thomas, USVI • Tortola, BVI • Disney Castaway Cay • Three days at sea", "sal": 2, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe sur", "e": "🌴", "n": 7, "s": "", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Oranjestad, Aruba • Willemstad, Curacao • Roseau, Dominica • St. John’s, Antigua and Barbuda • Two days at sea", "sal": 1, "desde": "dic 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 8, "s": "Fort Lauderdale", "b": [], "t": "", "tt": "", "x": "Disney Lookout Cay at Lighthouse Point • San Juan, PR • St. John’s, Antigua and Barbuda • Philipsburg, St. Maarten • Three days at sea", "sal": 1, "desde": "abr 2028", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 8, "s": "", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Tortola, BVI • St. Thomas, USVI • San Juan, PR • Disney Castaway Cay • Three days at sea", "sal": 1, "desde": "dic 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 3, "s": "San Diego", "b": [], "t": "", "tt": "", "x": "Ensenada, Mexico • One day at sea", "sal": 13, "desde": "ene 2028", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 3, "s": "San Diego", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Ensenada, Mexico • One day at sea", "sal": 5, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 3, "s": "San Diego", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Ensenada, Mexico • One day at sea", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 4, "s": "San Diego", "b": [], "t": "", "tt": "", "x": "Ensenada, Mexico • Catalina Island, California • One day at sea", "sal": 18, "desde": "nov 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 4, "s": "San Diego", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Ensenada, Mexico • Catalina Island, California • One day at sea", "sal": 5, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 5, "s": "San Diego", "b": [], "t": "", "tt": "", "x": "Catalina Island, California • Ensenada, Mexico • Two days at sea", "sal": 5, "desde": "sep 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 5, "s": "San Diego", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Catalina Island, California • Ensenada, Mexico • Two days at sea", "sal": 4, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 5, "s": "San Diego", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Cabo San Lucas, Mexico • Ensenada, Mexico • Two days at sea", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 6, "s": "San Diego", "b": [], "t": "", "tt": "", "x": "Cabo San Lucas, Mexico • Ensenada, Mexico • Three days at sea", "sal": 1, "desde": "abr 2028", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 6, "s": "San Diego", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Cabo San Lucas, Mexico • Ensenada, Mexico • Three days at sea", "sal": 2, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 7, "s": "San Diego", "b": [], "t": "", "tt": "", "x": "Ensenada, Mexico • Cabo San Lucas, Mexico • Puerto Vallarta, Mexico • Three days at sea", "sal": 6, "desde": "sep 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 7, "s": "San Diego", "b": [], "t": "halloween", "tt": "🎃 Halloween", "x": "Ensenada, Mexico • Cabo San Lucas, Mexico • Puerto Vallarta, Mexico • Three days at sea", "sal": 1, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 7, "s": "San Diego", "b": [], "t": "navidad", "tt": "🎄 Navidad", "x": "Ensenada, Mexico • Cabo San Lucas, Mexico • Puerto Vallarta, Mexico • Three days at sea", "sal": 2, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "pacifico-costa", "d": "Costa del Pacífico", "e": "🌲", "n": 4, "s": "San Diego", "b": [], "t": "", "tt": "", "x": "from Vancouver, B.C., ending in San Diego Vancouver, B.C. (Embarkation) • Three days at sea • San Diego (Disembarkation)", "sal": 4, "desde": "sep 2027", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "panama", "d": "Canal de Panamá", "e": "⚓", "n": 14, "s": "San Diego", "b": [], "t": "", "tt": "", "x": "from Galveston ending in San Diego Galveston, Texas (Embarkation) • Cartagena, Colombia • Colon, Panama • Panama Canal transit • Cabo San Lucas, Mexic", "sal": 2, "desde": "nov 2027", "hasta": "mar 2028", "fin": "", "f": 1},
  {"r": "transatlantico", "d": "Transatlántico", "e": "🌊", "n": 12, "s": "", "b": [], "t": "", "tt": "", "x": "from Southampton ending in New York Southampton, England (Embarkation) • Greenock (Glasgow), Scotland • Two days in Reykjavik, Iceland • St. Johns, Ne", "sal": 1, "desde": "sep 2027", "hasta": "sep 2027", "fin": "", "f": 1},
  {"r": "alaska", "d": "Alaska", "e": "🏔️", "n": 6, "s": "Vancouver", "b": ["Magic"], "t": "", "tt": "", "x": "Glaciar Stikine, Icy Strait Point y Ketchikan", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 2},
  {"r": "europa", "d": "Europa del Norte", "e": "⛵", "n": 3, "s": "Southampton", "b": ["Wish"], "t": "", "tt": "", "x": "Rotterdam (Ámsterdam)", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 2},
  {"r": "europa", "d": "Bélgica", "e": "🧇", "n": 3, "s": "Southampton", "b": ["Wish"], "t": "", "tt": "", "x": "Zeebrugge (Bruselas)", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 2},
  {"r": "europa", "d": "Mediterráneo", "e": "🏛️", "n": "", "s": "Barcelona", "b": [], "t": "", "tt": "", "x": "Empieza y termina en Barcelona", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "europa", "d": "Fiordos Noruegos", "e": "⛰️", "n": "", "s": "Copenhague o Dover", "b": [], "t": "", "tt": "", "x": "", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "europa", "d": "Islas Británicas", "e": "🫖", "n": "", "s": "Southampton", "b": [], "t": "", "tt": "", "x": "", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "hawai", "d": "Hawái", "e": "🌺", "n": "", "s": "", "b": [], "t": "", "tt": "", "x": "Sale de la costa oeste", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "pacifico", "d": "Pacífico Sur", "e": "🐚", "n": "", "s": "Honolulu o Sídney", "b": [], "t": "", "tt": "", "x": "Entre Honolulú y Sídney", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "singapur", "d": "Singapur", "e": "🏙️", "n": "", "s": "Singapur", "b": [], "t": "", "tt": "", "x": "Con el Disney Adventure, el barco más nuevo", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "oceania", "d": "Nueva Zelanda y Australia", "e": "🦘", "n": "", "s": "Sídney", "b": [], "t": "", "tt": "", "x": "", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0}
];

var REGIONES = [["bahamas", "🏝️ Bahamas"], ["caribe", "🌴 Caribe"], ["alaska", "🏔️ Alaska"], ["europa", "⛵ Europa"], ["mexico", "🌮 México"], ["bermuda", "🐠 Bermuda"], ["canada", "🍁 Canadá"], ["panama", "⚓ Canal de Panamá"], ["pacifico-costa", "🌲 Costa del Pacífico"], ["hawai", "🌺 Hawái"], ["pacifico", "🐚 Pacífico Sur"], ["transatlantico", "🌊 Transatlántico"], ["singapur", "🏙️ Singapur"], ["oceania", "🦘 Nueva Zelanda y Australia"]];

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
  /* Sin 'Barco': el calendario oficial de itinerarios no dice qué barco hace
     cada salida, y un filtro con dos opciones sueltas confunde más de lo que
     ayuda. */
  var defs = [['r', 'Destino', REGIONES], ['n', 'Noches', null], ['s', 'Sale de', null]];
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
    if (x.fin) sub.push('termina en ' + x.fin);
    if (x.b && x.b.length) sub.push(x.b.map(function (b) { return 'Disney ' + b; }).join(' o '));
    /* Lo que no tiene salidas publicadas no inventa barco ni duración. */
    if (!x.f && !x.n) sub.push('varias rutas');

    var cuando = '';
    if (x.sal) {
      cuando = x.sal + (x.sal === 1 ? ' salida' : ' salidas') +
               (x.desde === x.hasta ? ' en ' + x.desde : ' entre ' + x.desde + ' y ' + x.hasta);
    }
    var msg = 'Hola Sofi! Me interesa el crucero a ' + x.d +
              (x.n ? ' de ' + x.n + ' noches' : '') +
              (x.s ? ' saliendo de ' + x.s : '') +
              (x.sal ? ' (' + cuando + ')' : '') + '. Me pasás fechas y precio?';
    return '<article class="cru" data-reg="' + x.r + '">' +
      '<span class="cru-emoji">' + x.e + '</span>' +
      '<span class="cru-txt">' +
        '<span class="cru-dest">' + x.d + (x.tt ? ' <small class="cru-tema">' + x.tt + '</small>' : '') + '</span>' +
        '<span class="cru-sub">' + sub.join(' · ') + '</span>' +
        (cuando ? '<span class="cru-sal">' + cuando + '</span>' : '') +
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
