const allProducts = [
    // --- AMÉRICA DEL SUR ---
    {
        id: 1, name: "Iguazú Feriado de Agosto", price: 360456, imageUrl: "img/cataratas.webp", destino: "America del Sur", salida: "Agosto", noches: 3, description: "Descubre la majestuosidad de las Cataratas del Iguazú.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Agosto 2025", vuelo: "Directo AEP - IGR", hotel: "IGUAZÚ GREEN HOTEL", estrellas: 3, regimen: "Desayuno", cuotas: "9 cuotas sin interés!", marketplace: "Turismocity Marketplace" }, includes: ["Vuelo", "Hotel", "Traslados", "Asistencia"]
    },
    {
        id: 2, name: "Puerto Madryn Feriado de Noviembre", price: 682440, imageUrl: "img/madryn.jpg", destino: "America del Sur", salida: "Noviembre", noches: 3, description: "Avistaje de ballenas en Puerto Madryn, una experiencia natural única.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Noviembre 2025", vuelo: "Directo AEP - PMY", hotel: "LA POSADA DE MADRYN", estrellas: 4, regimen: "Desayuno", cuotas: "9 cuotas sin interés!", marketplace: "Turismocity Marketplace" }, includes: ["Vuelo", "Hotel", "Traslados", "Asistencia"]
    },
    {
        id: 3, name: "Paquete a Río de Janeiro", price: 280000, imageUrl: "img/rio_janeiro.webp", destino: "America del Sur", salida: "Octubre", noches: 5, description: "Vive la alegría de Río de Janeiro con sus playas y samba.", details: { saliendoDesde: "Córdoba", fechasSalida: "Octubre 2025", vuelo: "Directo COR - GIG", hotel: "Copacabana Palace", estrellas: 5, regimen: "Solo hospedaje", cuotas: "Hasta 12 cuotas!", marketplace: "" }, includes: ["Vuelo", "Hotel", "Traslados"]
    },
    {
        id: 7, name: "Aventura en Bariloche", price: 420000, imageUrl: "img/bariloche.png", destino: "America del Sur", salida: "Julio", noches: 7, description: "Disfruta de la nieve, paisajes y gastronomía en Bariloche.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Julio 2025", vuelo: "Directo AEP - BRC", hotel: "Hotel Nevada", estrellas: 4, regimen: "Media Pensión", cuotas: "Financiación disponible", marketplace: "Ofertas Express" }, includes: ["Vuelo", "Hotel", "Traslados", "Excursiones"]
    },
    {
        id: 8, name: "Escapada a Mendoza", price: 290000, imageUrl: "img/mendoza.webp", destino: "America del Sur", salida: "Septiembre", noches: 4, description: "Ruta del vino y paisajes cordilleranos en Mendoza.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Septiembre 2025", vuelo: "Directo AEP - MDZ", hotel: "Hotel Diplomatic", estrellas: 4, regimen: "Desayuno", cuotas: "Hasta 6 cuotas", marketplace: "WineTours Travel" }, includes: ["Vuelo", "Hotel", "Alquiler de Auto"]
    },
    {
        id: 9, name: "Norte Argentino Mágico", price: 380000, imageUrl: "img/salta_jujuy.webp", destino: "America del Sur", salida: "Abril", noches: 6, description: "Colores y culturas ancestrales en Salta y Jujuy.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Abril 2025", vuelo: "Directo AEP - SLA", hotel: "Hospedajes boutique", estrellas: 3, regimen: "Desayuno", cuotas: "Sin interés en 3 cuotas", marketplace: "Senderos Andinos" }, includes: ["Vuelo", "Hotel", "Bus interno", "Excursiones"]
    },
    {
        id: 10, name: "Cordoba Aventura", price: 180000, imageUrl: "img/cordoba.jpg", destino: "America del Sur", salida: "Marzo", noches: 3, description: "Sierras y tranquilidad en las cercanías de Córdoba Capital.", details: { saliendoDesde: "Rosario", fechasSalida: "Marzo 2025", vuelo: "Directo ROS - COR", hotel: "Cabañas Serrano", estrellas: 3, regimen: "Solo alojamiento", cuotas: "Cuotas fijas", marketplace: "EscapadasYa" }, includes: ["Vuelo", "Alojamiento"]
    },
    {
        id: 11, name: "Buenos Aires Esencial", price: 150000, imageUrl: "img/buenos_aires.jpeg", destino: "America del Sur", salida: "Febrero", noches: 3, description: "Descubre la vibrante capital argentina, tango y gastronomía.", details: { saliendoDesde: "Córdoba", fechasSalida: "Febrero 2025", vuelo: "Directo COR - AEP", hotel: "Hotel 725 Continental", estrellas: 4, regimen: "Desayuno", cuotas: "3 cuotas sin interés", marketplace: "CityBreaks AR" }, includes: ["Vuelo", "Hotel", "City Tour"]
    },
    {
        id: 12, name: "Glaciares Patagónicos Express", price: 550000, imageUrl: "img/patagonia_chica.webp", destino: "America del Sur", salida: "Diciembre", noches: 4, description: "Impactante visita al Glaciar Perito Moreno y El Calafate.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Diciembre 2025", vuelo: "Directo AEP - FTE", hotel: "Kosten Aike", estrellas: 4, regimen: "Desayuno", cuotas: "Hasta 9 cuotas", marketplace: "Patagonia Dreams" }, includes: ["Vuelo", "Hotel", "Traslados", "Excursión Glaciar"]
    },


    // --- CARIBE Y CENTROAMÉRICA ---
    {
        id: 5, name: "Playa y Relajo en Cancún", price: 520000, imageUrl: "img/caribe.webp", destino: "Caribe", salida: "Diciembre", noches: 7, description: "Disfruta de las playas de Cancún y sus aguas cristalinas, todo incluido.", details: { saliendoDesde: "Rosario", fechasSalida: "Diciembre 2025", vuelo: "Directo", hotel: "All Inclusive Resort", estrellas: 5, regimen: "Todo Incluido", cuotas: "12 cuotas sin interés", marketplace: "" }, includes: ["Vuelo", "Hotel All Inclusive", "Traslados"]
    },
    {
        id: 13, name: "Punta Cana Paradisíaca", price: 650000, imageUrl: "img/punta_cana.webp", destino: "Caribe", salida: "Enero", noches: 7, description: "Sol, arena y mar en las exclusivas playas de Punta Cana.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Enero 2026", vuelo: "Con escalas", hotel: "Hard Rock Hotel", estrellas: 5, regimen: "Todo Incluido", cuotas: "12 cuotas fijas", marketplace: "Caribean Vibes" }, includes: ["Vuelo", "Hotel All Inclusive", "Traslados Aeropuerto"]
    },
    {
        id: 14, name: "Cuba Clásica y Playas", price: 490000, imageUrl: "img/cuba.webp", destino: "Caribe", salida: "Noviembre", noches: 9, description: "Recorre La Habana colonial y relájate en Varadero.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Noviembre 2025", vuelo: "Con escalas", hotel: "Mixto (Habana/Varadero)", estrellas: 4, regimen: "Desayuno en Habana, Todo Incluido en Varadero", cuotas: "Hasta 9 cuotas", marketplace: "Cuba Libre Tours" }, includes: ["Vuelo", "Hoteles", "Traslados", "Visitas Guiadas"]
    },

    // --- EUROPA ---
    {
        id: 6, name: "Tour por ciudades históricas de Europa", price: 950000, imageUrl: "img/europa.webp", destino: "Europa", salida: "Septiembre", noches: 10, description: "Recorre las capitales europeas más icónicas: París, Roma, Barcelona.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Septiembre 2025", vuelo: "Directo", hotel: "Hoteles 4 estrellas", estrellas: 4, regimen: "Desayuno", cuotas: "6 cuotas fijas", marketplace: "" }, includes: ["Vuelo", "Hotel", "Trenes internos", "Tours guiados"]
    },
    {
        id: 15, name: "Encantos de París", price: 780000, imageUrl: "img/paris.webp", destino: "Europa", salida: "Mayo", noches: 6, description: "Descubre la ciudad del amor y sus monumentos emblemáticos.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Mayo 2026", vuelo: "Directo", hotel: "Novotel Paris Les Halles", estrellas: 4, regimen: "Desayuno", cuotas: "Hasta 12 cuotas", marketplace: "Paris Dreams" }, includes: ["Vuelo", "Hotel", "Paseo en Bateau Mouche"]
    },
    {
        id: 16, name: "Roma Imperial y Moderna", price: 810000, imageUrl: "img/roma.webp", destino: "Europa", salida: "Octubre", noches: 7, description: "Un viaje a través de la historia en la Ciudad Eterna.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Octubre 2025", vuelo: "Con escalas", hotel: "Hotel Artemide", estrellas: 4, regimen: "Desayuno", cuotas: "10 cuotas fijas", marketplace: "Vino & Viajes" }, includes: ["Vuelo", "Hotel", "Visita guiada Coliseo y Vaticano"]
    },
    {
        id: 17, name: "Londres Clásico", price: 750000, imageUrl: "img/londres.jpg", destino: "Europa", salida: "Julio", noches: 5, description: "Sumérgete en la cultura británica y sus atractivos.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Julio 2025", vuelo: "Directo", hotel: "The Z Hotel Piccadilly", estrellas: 3, regimen: "Solo alojamiento", cuotas: "Sin interés en 3 cuotas", marketplace: "British Getaways" }, includes: ["Vuelo", "Hotel", "London Pass"]
    },
    {
        id: 18, name: "Madrid y sus alrededores", price: 690000, imageUrl: "img/madrid.jpg", destino: "Europa", salida: "Junio", noches: 6, description: "Explora la capital española y excursiones a Toledo y Segovia.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Junio 2026", vuelo: "Directo", hotel: "Only YOU Hotel Atocha", estrellas: 4, regimen: "Desayuno", cuotas: "Hasta 9 cuotas", marketplace: "España Viva" }, includes: ["Vuelo", "Hotel", "Tren a Toledo", "Bus a Segovia"]
    },

    // --- ÁFRICA ---
    {
        id: 4, name: "Gran Safari por Kenia", price: 1200000, imageUrl: "img/kenya.webp", destino: "Africa", salida: "Julio", noches: 8, description: "Una inmersión profunda en la vida salvaje africana. Aventura garantizada.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Julio 2025", vuelo: "Con escalas", hotel: "Lodges de Lujo en Reservas", estrellas: 5, regimen: "Pensión completa", cuotas: "Financiación disponible", marketplace: "" }, includes: ["Vuelo", "Alojamiento", "Safaris guiados"]
    },
    {
        id: 19, name: "Maravillas de Egipto", price: 1100000, imageUrl: "img/egipto.jpg", destino: "Africa", salida: "Marzo", noches: 9, description: "Descubre las pirámides, templos y la historia milenaria de Egipto.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Marzo 2026", vuelo: "Con escalas", hotel: "Crucero por el Nilo + Hoteles", estrellas: 5, regimen: "Pensión completa", cuotas: "Hasta 12 cuotas fijas", marketplace: "Tesoros del Nilo" }, includes: ["Vuelo", "Crucero", "Hoteles", "Guías", "Excursiones"]
    },

    // --- ASIA ---
    {
        id: 20, name: "Templos y Playas de Tailandia", price: 980000, imageUrl: "img/tailandia.jpg", destino: "Asia", salida: "Abril", noches: 12, description: "Cultura vibrante, templos antiguos y playas paradisíacas en Tailandia.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Abril 2026", vuelo: "Con escalas", hotel: "Mixto (Bangkok/Phuket)", estrellas: 4, regimen: "Desayuno", cuotas: "Hasta 9 cuotas", marketplace: "Asia Fantástica" }, includes: ["Vuelo", "Hoteles", "Traslados internos", "Tours"]
    },
    {
        id: 21, name: "Modernidad y Tradición en Tokio", price: 1300000, imageUrl: "img/tokio.jpg", destino: "Asia", salida: "Octubre", noches: 7, description: "Sumérgete en la futurista y tradicional Tokio, Japón.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Octubre 2025", vuelo: "Con escalas", hotel: "Hotel Gracery Shinjuku", estrellas: 4, regimen: "Solo alojamiento", cuotas: "Financiación disponible", marketplace: "Tech & Culture Tours" }, includes: ["Vuelo", "Hotel", "Japan Rail Pass (7 días)"]
    },

    // --- AMÉRICA DEL NORTE ---
    {
        id: 22, name: "Nueva York Espectacular", price: 890000, imageUrl: "img/new_york.webp", destino: "America del Norte", salida: "Diciembre", noches: 6, description: "Vive la magia de la Gran Manzana en temporada festiva.", details: { saliendoDesde: "Buenos Aires", fechasSalida: "Diciembre 2025", vuelo: "Directo", hotel: "Row NYC", estrellas: 3, regimen: "Solo alojamiento", cuotas: "Hasta 12 cuotas", marketplace: "Big Apple Tours" }, includes: ["Vuelo", "Hotel", "Paseo en Bus Turístico"]
    }
];