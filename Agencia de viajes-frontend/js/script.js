document.addEventListener('DOMContentLoaded', () => {
    // Selectores de elementos del DOM
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    const productsGridContainer = document.querySelector('.products-grid'); // Contenedor principal de productos
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const cartCountSpan = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const viewPendingOrdersBtn = document.getElementById('view-pending-orders-btn');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    // Elementos de filtro y búsqueda
    const searchInput = document.getElementById('search-input');
    const destinoCheckboxes = document.querySelectorAll('input[name="destino"]');
    const salidaCheckboxes = document.querySelectorAll('input[name="salida"]');
    const nochesRadiobuttons = document.querySelectorAll('input[name="noches"]');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');

    // Menú Hamburguesa (para la versión móvil)
    const hamburgerMenuBtn = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');

    // Datos de productos (tu array completo de productos)
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

    let cart = []; // Almacenará objetos con { id, name, price, quantity }

    // --- Funciones de Carrito ---

    // Guarda el carrito en el localStorage
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Carga el carrito desde el localStorage
    function loadCart() {
        const storedCart = localStorage.getItem('shoppingCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
    }

    // Actualiza la interfaz de usuario del carrito
    function updateCartUI() {
        cartItemsList.innerHTML = ''; // Limpia la lista actual del carrito
        let total = 0;
        let itemCount = 0;

        // Muestra mensaje si el carrito está vacío
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Precio: $${item.price.toLocaleString('es-AR')} c/u</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="decrease-quantity-btn" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity-btn" data-id="${item.id}">+</button>
                        <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                `;
                cartItemsList.appendChild(cartItemDiv);
                total += item.price * item.quantity;
                itemCount += item.quantity;
            });
        }

        cartTotalAmount.textContent = `$${total.toLocaleString('es-AR')}`;
        cartCountSpan.textContent = itemCount;
        saveCart(); // Guarda el carrito después de cada actualización
    }

    // Agrega un producto al carrito o incrementa su cantidad si ya existe
    function addProductToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCartUI();
    }

    // Cambia la cantidad de un ítem en el carrito
    function changeItemQuantity(id, change) {
        const itemIndex = cart.findIndex(item => item.id === id);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1); // Elimina el ítem si la cantidad es 0 o menos
            }
        }
        updateCartUI();
    }

    // Remueve un producto del carrito
    function removeProductFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    }

    // --- Funciones de Renderizado de Productos y Filtros ---

    // Renderiza los productos en la cuadrícula
    function renderProducts(productsToRender) {
        // Limpia el contenedor antes de renderizar
        productsGridContainer.innerHTML = '';

        // Muestra un mensaje si no hay productos para renderizar
        if (productsToRender.length === 0) {
            productsGridContainer.innerHTML = '<p style="text-align: center; width: 100%; margin-top: 50px;">No se encontraron paquetes con los filtros seleccionados.</p>';
            return;
        }

        // Crea y añade las tarjetas de producto al DOM
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            // Almacena datos relevantes en atributos 'data-' para fácil acceso
            productCard.setAttribute('data-id', product.id);
            productCard.setAttribute('data-name', product.name);
            productCard.setAttribute('data-price', product.price);
            productCard.setAttribute('data-destino', product.destino);
            productCard.setAttribute('data-salida', product.salida);
            productCard.setAttribute('data-noches', product.noches);

            // Genera el HTML de las estrellas según la calificación del hotel
            let estrellasHtml = '';
            for (let i = 0; i < product.details.estrellas; i++) {
                estrellasHtml += '<i class="fas fa-star"></i>';
            }

            // Genera el HTML de los ítems incluidos con sus respectivos íconos
            let includesHtml = product.includes.map(include => {
                let iconClass = '';
                switch (include) {
                    case "Vuelo": iconClass = "fas fa-plane"; break;
                    case "Hotel": iconClass = "fas fa-hotel"; break;
                    case "Traslados": iconClass = "fas fa-car-side"; break;
                    case "Asistencia": iconClass = "fas fa-hand-holding-medical"; break;
                    case "Alojamiento": iconClass = "fas fa-bed"; break;
                    case "Safaris guiados": iconClass = "fas fa-binoculars"; break;
                    case "Trenes internos": iconClass = "fas fa-train"; break;
                    case "Tours guiados": iconClass = "fas fa-map-marked-alt"; break;
                    case "Todo Incluido": iconClass = "fas fa-utensils"; break;
                    case "Alquiler de Auto": iconClass = "fas fa-car"; break;
                    case "City Tour": iconClass = "fas fa-city"; break;
                    case "Excursiones": iconClass = "fas fa-hiking"; break;
                    case "Japan Rail Pass (7 días)": iconClass = "fas fa-train"; break;
                    default: iconClass = "fas fa-info-circle";
                }
                return `<span class="include-item"><i class="${iconClass}"></i> ${include}</span>`;
            }).join('');


            // Inserta todo el contenido HTML dentro de la tarjeta del producto
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <div class="card-body">
                    ${product.noches ? `<span class="badge">${product.noches} Noches</span>` : ''}
                    ${product.details.fechasSalida.includes('Feriado') || product.name.includes('Feriado') ? '<span class="badge">Feriados</span>' : ''}
                    <h3>${product.name}</h3>
                    <p>Destino: ${product.destino}</p>
                    <p>Saliendo desde: ${product.details.saliendoDesde}</p>
                    <p>Fechas de salida: ${product.details.fechasSalida}</p>
                    <p>Vuelo: ${product.details.vuelo}</p>
                    <p>Hotel: ${product.details.hotel} ${estrellasHtml} ${product.details.regimen}</p>
                    <div class="package-includes">
                        ${includesHtml}
                    </div>
                    <div class="product-footer">
                        <div class="product-price">
                            <p class="final-price">$${product.price.toLocaleString('es-AR')}</p>
                            ${product.details.cuotas ? `<p class="installments">${product.details.cuotas}</p>` : ''}
                            ${product.details.marketplace ? `<p class="sales-info">${product.details.marketplace}</p>` : ''}
                        </div>
                        <button class="btn add-to-cart-btn">Comprar</button>
                    </div>
                </div>
            `;
            productsGridContainer.appendChild(productCard);
        });
    }

    // Aplica los filtros seleccionados a los productos
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDestinos = Array.from(destinoCheckboxes)
                                    .filter(checkbox => checkbox.checked)
                                    .map(checkbox => checkbox.value.toLowerCase());
        const selectedSalidas = Array.from(salidaCheckboxes)
                                   .filter(checkbox => checkbox.checked)
                                   .map(checkbox => checkbox.value.toLowerCase());
        const selectedNochesRange = document.querySelector('input[name="noches"]:checked').value;


        const filteredProducts = allProducts.filter(product => {
            // Filtro por término de búsqueda (nombre, descripción, destino)
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                  product.description.toLowerCase().includes(searchTerm) ||
                                  product.destino.toLowerCase().includes(searchTerm);

            // Filtro por destino
            const matchesDestino = selectedDestinos.length === 0 || selectedDestinos.includes(product.destino.toLowerCase());
            // Filtro por fecha de salida
            const matchesSalida = selectedSalidas.length === 0 || product.salida && selectedSalidas.includes(product.salida.toLowerCase());

            // Filtro por rango de noches
            const matchesNoches = (() => {
                if (selectedNochesRange === 'all') return true; // Si es "Todas las noches", no aplica filtro
                const noches = product.noches;
                if (noches === undefined) return false; // Si el producto no tiene noches definidas

                switch (selectedNochesRange) {
                    case '0-3': return noches >= 0 && noches <= 3;
                    case '4-7': return noches >= 4 && noches <= 7;
                    case '8-14': return noches >= 8 && noches <= 14;
                    case '15+': return noches >= 15;
                    default: return false;
                }
            })();

            return matchesSearch && matchesDestino && matchesSalida && matchesNoches;
        });

        renderProducts(filteredProducts); // Renderiza los productos filtrados

        // Desplaza la vista a la sección de productos después de aplicar filtros
        const productsSection = document.getElementById('productos');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Limpia todos los filtros y vuelve a mostrar todos los productos
    function clearFilters() {
        searchInput.value = ''; // Limpiar campo de búsqueda
        destinoCheckboxes.forEach(checkbox => checkbox.checked = false); // Desmarcar destinos
        salidaCheckboxes.forEach(checkbox => checkbox.checked = false); // Desmarcar salidas
        // Seleccionar la opción "Todas las noches" (asegúrate de que el value sea 'all' en tu HTML)
        document.querySelector('input[name="noches"][value="all"]').checked = true;

        renderProducts(allProducts); // Volver a renderizar todos los productos sin filtros
        const productsSection = document.getElementById('productos');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }


    // --- Event Listeners ---

    // Abre el sidebar del carrito
    openCartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        overlay.classList.add('visible');
    });

    // Cierra el sidebar del carrito
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('visible');
    });

    // Cierra el sidebar del carrito al hacer clic en el overlay
    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('visible');
    });

    // Delegación de eventos para añadir productos al carrito
    productsGridContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productCard = e.target.closest('.product-card');
            const id = parseInt(productCard.dataset.id);
            const name = productCard.dataset.name;
            const price = parseFloat(productCard.dataset.price);
            addProductToCart(id, name, price);
        }
    });

    // Delegación de eventos para cambiar cantidad o remover ítems del carrito
    cartItemsList.addEventListener('click', (e) => {
        const target = e.target;
        const id = parseInt(target.dataset.id);

        if (target.classList.contains('increase-quantity-btn')) {
            changeItemQuantity(id, 1);
        } else if (target.classList.contains('decrease-quantity-btn')) {
            changeItemQuantity(id, -1);
        } else if (target.classList.contains('remove-item-btn')) {
            removeProductFromCart(id);
        }
    });

    // Event listener para el botón "Proceder al Pago"
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Obtener el valor numérico del total, quitando el símbolo de $ y formateo de miles
            const totalAmount = parseFloat(cartTotalAmount.textContent.replace('$', '').replace(/\./g, '').replace(',', '.'));
            
            // Guardar el total y los ítems del carrito en localStorage
            localStorage.setItem('checkoutTotal', totalAmount);
            localStorage.setItem('checkoutCart', JSON.stringify(cart));

            // Redirigir a la página de checkout
            window.location.href = 'checkout.html';
        } else {
            alert('Tu carrito está vacío. Agrega productos para proceder al pago.');
        }
    });

    // Event listener para el botón "Ver Pedidos Pendientes" (funcionalidad simulada)
        viewPendingOrdersBtn.addEventListener('click', () => {
        window.location.href = '/orders'; // Redirige a la nueva página de historial de pedidos
    });

    // Eventos para filtros y buscador
    applyFiltersBtn.addEventListener('click', applyFilters);
    clearFiltersBtn.addEventListener('click', clearFilters);
    searchInput.addEventListener('input', applyFilters); // Aplica filtros al escribir en el buscador
    destinoCheckboxes.forEach(checkbox => checkbox.addEventListener('change', applyFilters));
    salidaCheckboxes.forEach(checkbox => checkbox.addEventListener('change', applyFilters));
    nochesRadiobuttons.forEach(radio => radio.addEventListener('change', applyFilters));

    // Menú Hamburguesa Event Listeners
    hamburgerMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active'); // Alterna la clase 'active' para mostrar/ocultar el menú
    });

    // Cierra el menú hamburguesa al hacer clic en un enlace de navegación
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
        });
    });

    // --- Inicialización al cargar la página ---
    loadCart(); // Carga el carrito guardado
    updateCartUI(); // Actualiza la interfaz del carrito

    // Renderiza todos los productos solo si estamos en index.html
    // productsGridContainer será null en checkout.html, evitando errores.
    if (productsGridContainer) {
        renderProducts(allProducts);
    }
});