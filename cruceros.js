/* ═══════════════ A DÓNDE VA DISNEY ═══════════════
   El catálogo de rutas de Disney Cruise Line, con sus salidas y su barco.

   FUENTE: el flyer oficial de itinerarios que Disney publica para agentes en
   disneytravelagents.com (Disney Cruise Line → Destinations → "View a flyer
   showing an itinerary overview"), temporada otoño 2027 y primavera 2028. El
   propio PDF aclara: "Itineraries and sail dates are subject to change."

   Cada página del PDF es un (puerto, barco) y los dos están como imagen, no
   como texto: la tabla salió de mirar las 15 páginas renderizadas, con
   _tools/cruceros_encabezados.py.

   f: 1  ruta del calendario oficial: trae salidas, meses, puerto y barco.
   f: 2  fuera de esa temporada (Alaska y Europa navegan en verano) pero
         verificada en la página pública del destino: barco y noches, sin fechas.
   f: 0  sólo el destino. No se le inventa ni barco ni duración.

   NO lleva precios: dependen de la promoción, la fecha, el barco y el
   camarote, así que los pone Sofi. Cómo se rehace: _tools/cruceros_datos.md.

   r=región · d=destino · e=emoji · n=noches · s=puertos · b=barcos · x=escalas
   sal=cuántas salidas · desde/hasta=meses · fin=puerto de llegada
   t/tt=temporada temática · f=de dónde salió el dato */
var RUTAS = [
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 3, "s": ["Fort Lauderdale", "Port Canaveral"], "b": ["Dream", "Wish"], "t": "", "tt": "", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas", "sal": 22, "desde": "nov 2027", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 3, "s": ["Fort Lauderdale", "Port Canaveral"], "b": ["Destiny", "Dream"], "t": "halloween", "tt": "🎃 Halloween", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas", "sal": 8, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 3, "s": ["Fort Lauderdale", "Port Canaveral"], "b": ["Destiny", "Dream", "Wish"], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas", "sal": 9, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 4, "s": ["Fort Lauderdale", "Port Canaveral"], "b": ["Destiny", "Dream", "Fantasy", "Wish"], "t": "", "tt": "", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas • One day at sea", "sal": 41, "desde": "nov 2027", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 4, "s": ["Fort Lauderdale", "Port Canaveral"], "b": ["Destiny", "Dream", "Fantasy"], "t": "halloween", "tt": "🎃 Halloween", "x": "Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Nassau, The Bahamas", "sal": 14, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 4, "s": ["Fort Lauderdale", "Port Canaveral"], "b": ["Destiny", "Dream", "Fantasy", "Wish"], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas • One day at sea", "sal": 11, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 5, "s": ["Fort Lauderdale", "Port Canaveral"], "b": ["Destiny"], "t": "", "tt": "", "x": "Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Nassau, The Bahamas • One day at sea", "sal": 20, "desde": "nov 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 5, "s": ["Port Canaveral"], "b": ["Fantasy"], "t": "halloween", "tt": "🎃 Halloween", "x": "Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Nassau, The Bahamas • One day at sea", "sal": 7, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 5, "s": ["Fort Lauderdale", "Port Canaveral"], "b": ["Destiny", "Dream", "Fantasy"], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Castaway Cay • Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas • One day at sea", "sal": 5, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 6, "s": ["Fort Lauderdale", "Port Canaveral"], "b": ["Fantasy", "Treasure"], "t": "", "tt": "", "x": "Two days at Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Nassau, The Bahamas • One day at sea", "sal": 2, "desde": "ene 2028", "hasta": "ene 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 6, "s": ["Fort Lauderdale"], "b": ["Dream"], "t": "navidad", "tt": "🎄 Navidad", "x": "Two days at Disney Castaway Cay • Nassau, The Bahamas • Disney Lookout Cay at Lighthouse Point • One day at sea", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 7, "s": ["Galveston"], "b": ["Magic"], "t": "", "tt": "", "x": "Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Four days at sea", "sal": 3, "desde": "dic 2027", "hasta": "mar 2028", "fin": "", "f": 1},
  {"r": "bahamas", "d": "Bahamas", "e": "🏝️", "n": 7, "s": ["Galveston"], "b": ["Magic"], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Lookout Cay at Lighthouse Point • Nassau, The Bahamas • Four days at sea", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "bermuda", "d": "Bermuda", "e": "🐠", "n": 4, "s": ["Nueva York"], "b": ["Wish"], "t": "", "tt": "", "x": "Bermuda • Two days at sea", "sal": 1, "desde": "sep 2027", "hasta": "sep 2027", "fin": "", "f": 1},
  {"r": "bermuda", "d": "Bermuda", "e": "🐠", "n": 5, "s": ["Nueva York"], "b": ["Wish"], "t": "halloween", "tt": "🎃 Halloween", "x": "from New York ending in San Juan New York (Embarkation) • Bermuda • Three days at sea • San Juan, PR (Disembarkation)", "sal": 3, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bermuda", "d": "Bermuda", "e": "🐠", "n": 6, "s": ["Nueva York"], "b": ["Wish"], "t": "halloween", "tt": "🎃 Halloween", "x": "Bermuda • Halifax, Nova Scotia • Three days at sea", "sal": 1, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "bermuda", "d": "Bermuda", "e": "🐠", "n": 8, "s": ["Fort Lauderdale"], "b": ["Fantasy"], "t": "", "tt": "", "x": "Two days at Bermuda • Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • Three days at sea", "sal": 1, "desde": "mar 2028", "hasta": "mar 2028", "fin": "", "f": 1},
  {"r": "canada", "d": "Canadá", "e": "🍁", "n": 5, "s": ["Nueva York"], "b": ["Wish"], "t": "halloween", "tt": "🎃 Halloween", "x": "St. John, New Brunswick • Boston • Two days at sea", "sal": 1, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "canada", "d": "Canadá", "e": "🍁", "n": 7, "s": ["Nueva York"], "b": ["Wish"], "t": "halloween", "tt": "🎃 Halloween", "x": "Charlottetown, PEI • Sydney, Nova Scotia • Halifax, Nova Scotia • Three days at sea", "sal": 1, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 4, "s": ["Galveston"], "b": ["Magic"], "t": "", "tt": "", "x": "Progreso, Mexico • Two days at sea", "sal": 7, "desde": "nov 2027", "hasta": "mar 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 4, "s": ["San Juan"], "b": ["Wish"], "t": "", "tt": "", "x": "from San Juan ending in Port Canaveral San Juan, PR (Embarkation) • Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • One day at sea • Po", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 4, "s": ["Galveston"], "b": ["Magic"], "t": "navidad", "tt": "🎄 Navidad", "x": "Progreso, Mexico • Two days at sea", "sal": 2, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 5, "s": ["Fort Lauderdale", "Galveston", "Port Canaveral"], "b": ["Dream", "Fantasy", "Magic"], "t": "", "tt": "", "x": "Disney Castaway Cay • Cozumel, Mexico • Two days at sea", "sal": 12, "desde": "sep 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 5, "s": ["Fort Lauderdale"], "b": ["Destiny"], "t": "halloween", "tt": "🎃 Halloween", "x": "Cozumel, Mexico • Disney Castaway Cay • Two days at sea", "sal": 3, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 5, "s": ["Galveston", "Port Canaveral"], "b": ["Destiny", "Fantasy", "Magic"], "t": "navidad", "tt": "🎄 Navidad", "x": "Disney Castaway Cay • Cozumel, Mexico • Two days at sea", "sal": 5, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 5, "s": ["Port Canaveral", "San Juan"], "b": ["Fantasy"], "t": "navidad", "tt": "🎄 Navidad", "x": "from San Juan ending in Fort Lauderdale San Juan, PR (Embarkation) • St Thomas, USVI • Disney Lookout Cay at Lighthouse Point • Disney Castaway Cay • ", "sal": 2, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 6, "s": ["Port Canaveral"], "b": ["Destiny"], "t": "", "tt": "", "x": "Cozumel, Mexico • Grand Cayman, Cayman Islands • Disney Castaway Cay • Two days at sea", "sal": 1, "desde": "ene 2028", "hasta": "ene 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 6, "s": ["Fort Lauderdale", "San Juan"], "b": ["Fantasy"], "t": "", "tt": "", "x": "from San Juan ending in Port Canaveral San Juan, PR (Embarkation) • Philipsburg, St. Maarten • St. Thomas, USVI • Disney Lookout Cay at Lighthouse Poi", "sal": 2, "desde": "abr 2028", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 7, "s": ["Fort Lauderdale", "Port Canaveral", "San Juan"], "b": ["Fantasy", "Treasure"], "t": "", "tt": "", "x": "Bridgetown, Barbados • Castries, St. Lucia • Roseau, Dominica • St. John’s, Antigua and Barbuda • Two days at sea", "sal": 18, "desde": "nov 2027", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 7, "s": ["Port Canaveral"], "b": ["Treasure"], "t": "", "tt": "", "x": "Cozumel, Mexico • Grand Cayman, Cayman Islands • Falmouth, Jamaica • Disney Castaway Cay • Two days at sea", "sal": 9, "desde": "dic 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe sur", "e": "🌴", "n": 7, "s": ["San Juan"], "b": ["Fantasy", "Wish"], "t": "", "tt": "", "x": "Oranjestad, Aruba • Kralendijk, Bonaire • Willemstad, Curacao • Philipsburg, St. Maarten • Two days at sea", "sal": 2, "desde": "nov 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 7, "s": ["Port Canaveral"], "b": ["Treasure"], "t": "halloween", "tt": "🎃 Halloween", "x": "Cozumel, Mexico • Grand Cayman, Cayman Islands • Falmouth, Jamaica • Disney Castaway Cay • Two days at sea", "sal": 3, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 7, "s": ["Port Canaveral"], "b": ["Treasure"], "t": "halloween", "tt": "🎃 Halloween", "x": "Tortola, BVI • St. Thomas, USVI • Disney Castaway Cay • Three days at sea", "sal": 2, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe occidental", "e": "🌴", "n": 7, "s": ["Port Canaveral"], "b": ["Destiny", "Treasure"], "t": "navidad", "tt": "🎄 Navidad", "x": "Cozumel, Mexico • Grand Cayman, Cayman Islands • Falmouth, Jamaica • Disney Castaway Cay • Two days at sea", "sal": 4, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 7, "s": ["Port Canaveral"], "b": ["Treasure"], "t": "navidad", "tt": "🎄 Navidad", "x": "St. Thomas, USVI • Tortola, BVI • Disney Castaway Cay • Three days at sea", "sal": 2, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe sur", "e": "🌴", "n": 7, "s": ["San Juan"], "b": ["Fantasy"], "t": "navidad", "tt": "🎄 Navidad", "x": "Oranjestad, Aruba • Willemstad, Curacao • Roseau, Dominica • St. John’s, Antigua and Barbuda • Two days at sea", "sal": 1, "desde": "dic 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 8, "s": ["Fort Lauderdale"], "b": ["Fantasy"], "t": "", "tt": "", "x": "Disney Lookout Cay at Lighthouse Point • San Juan, PR • St. John’s, Antigua and Barbuda • Philipsburg, St. Maarten • Three days at sea", "sal": 1, "desde": "abr 2028", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "caribe", "d": "Caribe oriental", "e": "🌴", "n": 8, "s": ["Port Canaveral"], "b": ["Treasure"], "t": "navidad", "tt": "🎄 Navidad", "x": "Tortola, BVI • St. Thomas, USVI • San Juan, PR • Disney Castaway Cay • Three days at sea", "sal": 1, "desde": "dic 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 3, "s": ["San Diego"], "b": ["Wonder"], "t": "", "tt": "", "x": "Ensenada, Mexico • One day at sea", "sal": 13, "desde": "ene 2028", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 3, "s": ["San Diego"], "b": ["Magic", "Wonder"], "t": "halloween", "tt": "🎃 Halloween", "x": "Ensenada, Mexico • One day at sea", "sal": 5, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 3, "s": ["San Diego"], "b": ["Wonder"], "t": "navidad", "tt": "🎄 Navidad", "x": "Ensenada, Mexico • One day at sea", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 4, "s": ["San Diego"], "b": ["Wonder"], "t": "", "tt": "", "x": "Ensenada, Mexico • Catalina Island, California • One day at sea", "sal": 18, "desde": "nov 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 4, "s": ["San Diego"], "b": ["Wonder"], "t": "halloween", "tt": "🎃 Halloween", "x": "Ensenada, Mexico • Catalina Island, California • One day at sea", "sal": 5, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Baja California", "e": "🌵", "n": 5, "s": ["San Diego"], "b": ["Magic", "Wonder"], "t": "", "tt": "", "x": "Catalina Island, California • Ensenada, Mexico • Two days at sea", "sal": 5, "desde": "sep 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 5, "s": ["San Diego"], "b": ["Magic", "Wonder"], "t": "halloween", "tt": "🎃 Halloween", "x": "Catalina Island, California • Ensenada, Mexico • Two days at sea", "sal": 4, "desde": "sep 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 5, "s": ["San Diego"], "b": ["Wonder"], "t": "navidad", "tt": "🎄 Navidad", "x": "Cabo San Lucas, Mexico • Ensenada, Mexico • Two days at sea", "sal": 1, "desde": "nov 2027", "hasta": "nov 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 6, "s": ["San Diego"], "b": ["Wonder"], "t": "", "tt": "", "x": "Cabo San Lucas, Mexico • Ensenada, Mexico • Three days at sea", "sal": 1, "desde": "abr 2028", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 6, "s": ["San Diego"], "b": ["Magic"], "t": "halloween", "tt": "🎃 Halloween", "x": "Cabo San Lucas, Mexico • Ensenada, Mexico • Three days at sea", "sal": 2, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 7, "s": ["San Diego"], "b": ["Magic", "Wonder"], "t": "", "tt": "", "x": "Ensenada, Mexico • Cabo San Lucas, Mexico • Puerto Vallarta, Mexico • Three days at sea", "sal": 6, "desde": "sep 2027", "hasta": "abr 2028", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 7, "s": ["San Diego"], "b": ["Magic"], "t": "halloween", "tt": "🎃 Halloween", "x": "Ensenada, Mexico • Cabo San Lucas, Mexico • Puerto Vallarta, Mexico • Three days at sea", "sal": 1, "desde": "oct 2027", "hasta": "oct 2027", "fin": "", "f": 1},
  {"r": "mexico", "d": "Riviera Mexicana", "e": "🌮", "n": 7, "s": ["San Diego"], "b": ["Wonder"], "t": "navidad", "tt": "🎄 Navidad", "x": "Ensenada, Mexico • Cabo San Lucas, Mexico • Puerto Vallarta, Mexico • Three days at sea", "sal": 2, "desde": "nov 2027", "hasta": "dic 2027", "fin": "", "f": 1},
  {"r": "pacifico-costa", "d": "Costa del Pacífico", "e": "🌲", "n": 4, "s": ["San Diego"], "b": ["Magic", "Wonder"], "t": "", "tt": "", "x": "from Vancouver, B.C., ending in San Diego Vancouver, B.C. (Embarkation) • Three days at sea • San Diego (Disembarkation)", "sal": 4, "desde": "sep 2027", "hasta": "may 2028", "fin": "", "f": 1},
  {"r": "panama", "d": "Canal de Panamá", "e": "⚓", "n": 14, "s": ["Galveston", "San Diego"], "b": ["Magic"], "t": "", "tt": "", "x": "from Galveston ending in San Diego Galveston, Texas (Embarkation) • Cartagena, Colombia • Colon, Panama • Panama Canal transit • Cabo San Lucas, Mexic", "sal": 2, "desde": "nov 2027", "hasta": "mar 2028", "fin": "", "f": 1},
  {"r": "transatlantico", "d": "Transatlántico", "e": "🌊", "n": 12, "s": ["Nueva York"], "b": ["Wish"], "t": "", "tt": "", "x": "from Southampton ending in New York Southampton, England (Embarkation) • Greenock (Glasgow), Scotland • Two days in Reykjavik, Iceland • St. Johns, Ne", "sal": 1, "desde": "sep 2027", "hasta": "sep 2027", "fin": "", "f": 1},
  {"r": "alaska", "d": "Alaska", "e": "🏔️", "n": 6, "s": ["Vancouver"], "b": ["Magic"], "t": "", "tt": "", "x": "Glaciar Stikine, Icy Strait Point y Ketchikan", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 2},
  {"r": "europa", "d": "Europa del Norte", "e": "⛵", "n": 3, "s": ["Southampton"], "b": ["Wish"], "t": "", "tt": "", "x": "Rotterdam (Ámsterdam)", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 2},
  {"r": "europa", "d": "Bélgica", "e": "🧇", "n": 3, "s": ["Southampton"], "b": ["Wish"], "t": "", "tt": "", "x": "Zeebrugge (Bruselas)", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 2},
  {"r": "europa", "d": "Mediterráneo", "e": "🏛️", "n": "", "s": ["Barcelona"], "b": [], "t": "", "tt": "", "x": "Empieza y termina en Barcelona", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "europa", "d": "Fiordos Noruegos", "e": "⛰️", "n": "", "s": ["Copenhague", "Dover"], "b": [], "t": "", "tt": "", "x": "", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "europa", "d": "Islas Británicas", "e": "🫖", "n": "", "s": ["Southampton"], "b": [], "t": "", "tt": "", "x": "", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "hawai", "d": "Hawái", "e": "🌺", "n": "", "s": [], "b": [], "t": "", "tt": "", "x": "Sale de la costa oeste", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "pacifico", "d": "Pacífico Sur", "e": "🐚", "n": "", "s": ["Honolulu", "Sídney"], "b": [], "t": "", "tt": "", "x": "Entre Honolulú y Sídney", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "singapur", "d": "Singapur", "e": "🏙️", "n": "", "s": ["Singapur"], "b": [], "t": "", "tt": "", "x": "Con el Disney Adventure, el barco más nuevo", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0},
  {"r": "oceania", "d": "Nueva Zelanda y Australia", "e": "🦘", "n": "", "s": ["Sídney"], "b": [], "t": "", "tt": "", "x": "", "sal": 0, "desde": "", "hasta": "", "fin": "", "f": 0}
];

var REGIONES = [["bahamas", "🏝️ Bahamas"], ["caribe", "🌴 Caribe"], ["alaska", "🏔️ Alaska"], ["europa", "⛵ Europa"], ["mexico", "🌮 México"], ["bermuda", "🐠 Bermuda"], ["canada", "🍁 Canadá"], ["panama", "⚓ Canal de Panamá"], ["pacifico-costa", "🌲 Costa del Pacífico"], ["hawai", "🌺 Hawái"], ["pacifico", "🐚 Pacífico Sur"], ["transatlantico", "🌊 Transatlántico"], ["singapur", "🏙️ Singapur"], ["oceania", "🦘 Nueva Zelanda y Australia"]];

var WA_CRUCEROS = '5491132924274';
var fCru = { r: '', n: '', b: '', s: '' };

/* Cada ruta puede salir de varios puertos y hacerse con varios barcos, asi que
   esos dos se guardan como lista y el filtro mira si la lista contiene lo
   elegido. */
function cruTiene(x, campo, valor) {
  if (!valor) return true;
  var v = x[campo];
  if (Array.isArray(v)) return v.indexOf(valor) >= 0;
  return String(v) === valor;
}

/* Las rutas que pasan todos los filtros MENOS uno. Sirve para dos cosas: la
   lista (sin excluir ninguno) y las opciones de cada filtro, que se calculan
   sobre lo que ya quedo elegido en los otros. */
function cruFiltradas(exceptoCampo) {
  return RUTAS.filter(function (x) {
    return ['r', 'n', 'b', 's'].every(function (c) {
      return c === exceptoCampo || cruTiene(x, c, fCru[c]);
    });
  });
}

function cruOpciones(campo) {
  var v = [];
  cruFiltradas(campo).forEach(function (x) {
    var y = Array.isArray(x[campo]) ? x[campo] : [x[campo]];
    y.forEach(function (z) {
      if (!z) return;
      /* "7 a 8" y "4 o 5" son destinos sin salidas publicadas: se muestran en
         la ficha, pero no como opcion para elegir. */
      if (campo === 'n' && !String(z).match(/^\d+$/)) return;
      if (v.indexOf(z) < 0) v.push(z);
    });
  });
  if (campo === 'n') v.sort(function (a, b) { return parseInt(a) - parseInt(b); });
  else v.sort();
  return v;
}

function cruChips() {
  /* El destino va sin "Todos" a proposito: mostrarlos todos de entrada era un
     choclazo de 64 fichas y de puertos de medio mundo. Se elige uno y recien
     ahi aparece el resto. Tocar el que esta elegido lo apaga. */
  var cont = document.getElementById('cru-f-r');
  if (cont) {
    cont.innerHTML = REGIONES.map(function (o) {
      var on = fCru.r === o[0];
      return '<button class="pr-chip' + (on ? ' on' : '') + '" data-c="r" data-v="' +
             (on ? '' : o[0]) + '">' + o[1] + '</button>';
    }).join('');
  }

  var mas = document.getElementById('cru-mas');
  if (mas) mas.hidden = !fCru.r;
  if (!fCru.r) return;

  [['n', 'Noches'], ['b', 'Barco'], ['s', 'Sale de']].forEach(function (d) {
    var c = document.getElementById('cru-f-' + d[0]);
    if (!c) return;
    var ops = cruOpciones(d[0]);
    /* Si con el destino elegido ese filtro tiene una sola opcion, no se
       muestra: elegirla no cambiaria nada. */
    var caja = c.closest('.pr-f');
    if (caja) caja.hidden = ops.length < 2;
    c.innerHTML = '<button class="pr-chip' + (fCru[d[0]] ? '' : ' on') +
        '" data-c="' + d[0] + '" data-v="">Todos</button>' +
      ops.map(function (v) {
        var txt = d[0] === 'n' ? v + ' noches' : v;
        return '<button class="pr-chip' + (fCru[d[0]] === String(v) ? ' on' : '') +
               '" data-c="' + d[0] + '" data-v="' + v + '">' + txt + '</button>';
      }).join('');
  });
}

function cruRender() {
  var cont = document.getElementById('cru-lista');
  var cuenta = document.getElementById('cru-cuenta');
  if (!cont) return;

  if (!fCru.r) {
    cont.innerHTML = '<p class="cru-elegi">Elegí un destino para ver sus rutas, ' +
      'con cuántas noches, desde qué puerto, en qué barco y cuándo sale.</p>';
    if (cuenta) cuenta.textContent = '';
    return;
  }

  var l = cruFiltradas();
  if (cuenta) {
    cuenta.textContent = l.length + (l.length === 1 ? ' ruta' : ' rutas') +
      (l.length ? ' · ' + l.reduce(function (a, x) { return a + (x.sal || 0); }, 0) +
                  ' salidas' : '');
  }
  if (!l.length) {
    cont.innerHTML = '<p class="pr-vacio">Con esa combinación no tengo ninguna cargada — ' +
      'pero <a href="#cotiza">preguntame</a> y lo averiguo.</p>';
    return;
  }
  cont.innerHTML = l.map(function (x) {
    var sub = [];
    if (x.n) sub.push(x.n + ' noches');
    var puertos = Array.isArray(x.s) ? x.s : (x.s ? [x.s] : []);
    if (puertos.length) sub.push('sale de ' + puertos.join(' o '));
    if (x.fin) sub.push('termina en ' + x.fin);
    /* "Disney Destiny o Disney Dream o Disney Fantasy o Disney Wish" no entra
       en una línea: se dice el Disney una vez y el resto por su nombre. */
    if (x.b && x.b.length) {
      sub.push(x.b.length === 1
        ? 'en el Disney ' + x.b[0]
        : 'en el Disney ' + x.b.slice(0, -1).join(', ') + ' o el ' + x.b[x.b.length - 1]);
    }
    if (!x.f && !x.n) sub.push('varias rutas');

    var cuando = '';
    if (x.sal) {
      cuando = x.sal + (x.sal === 1 ? ' salida' : ' salidas') +
               (x.desde === x.hasta ? ' en ' + x.desde : ' entre ' + x.desde + ' y ' + x.hasta);
    }
    var msg = 'Hola Sofi! Me interesa el crucero a ' + x.d +
              (x.n ? ' de ' + x.n + ' noches' : '') +
              (puertos.length ? ' saliendo de ' + puertos.join(' o ') : '') +
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
    var campo = chip.dataset.c;
    fCru[campo] = chip.dataset.v;
    /* Cambiar de destino borra lo demas: un barco o un puerto del destino
       anterior no existe en el nuevo y dejaba la lista vacia. */
    if (campo === 'r') { fCru.n = ''; fCru.b = ''; fCru.s = ''; }
    cruChips(); cruRender();
    if (typeof gtag === 'function') {
      gtag('event', 'filtrar_cruceros', { item: campo + ':' + (chip.dataset.v || 'todos') });
    }
    return;
  }
  var cta = e.target.closest('.cru-cta');
  if (cta && typeof gtag === 'function') {
    gtag('event', 'click_whatsapp', { ubicacion: 'catalogo_cruceros', item: cta.dataset.dest });
  }
});

if (document.getElementById('cru-lista')) { cruChips(); cruRender(); }
