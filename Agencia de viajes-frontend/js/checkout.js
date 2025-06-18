document.addEventListener('DOMContentLoaded', () => {
    // Definimos tus credenciales de EmailJS directamente aquí
    const EMAILJS_PUBLIC_KEY = "iwJXB5bGtcr3E0pZc";
    const EMAILJS_SERVICE_ID = "service_thqxdgm";
    const EMAILJS_TEMPLATE_ID = "template_pfvdr9b";

    // Inicializar EmailJS con tu Public Key
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
    });

    // Obtención de elementos del DOM
    const checkoutTotalAmountSpan = document.getElementById('checkout-total-amount');
    const checkoutItemsSummaryDiv = document.getElementById('checkout-items-summary');
    const paymentForm = document.getElementById('payment-form');
    const emailInput = document.getElementById('email');
    const cardNameInput = document.getElementById('card-name'); // Asumo que tienes un input con este ID

    // Cargar datos del almacenamiento local
    const storedTotal = localStorage.getItem('checkoutTotal');
    const storedCart = localStorage.getItem('checkoutCart');

    let totalAmount = 0;
    let cartItems = [];

    if (storedTotal && storedCart) {
        totalAmount = parseFloat(storedTotal);
        cartItems = JSON.parse(storedCart);
        // Renderizar resumen del carrito en checkout.html
        checkoutTotalAmountSpan.textContent = `$${totalAmount.toLocaleString('es-AR')}`;
        checkoutItemsSummaryDiv.innerHTML = cartItems.map(item => `
            <div class="summary-item">
                <span>${item.quantity}x ${item.name}</span>
                <span>$${(item.price * item.quantity).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        `).join('');
    } else {
        // Si no hay datos en localStorage, redirigir al carrito o mostrar un mensaje
        // Usamos una alerta simple aquí, pero se recomienda un modal personalizado.
        alert('No hay elementos en el carrito para proceder al pago. Redirigiendo a inicio.');
        window.location.href = '/'; // Redirige a la página principal.
    }

    // Manejo del formulario de pago
    paymentForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Datos que enviarás a tu backend
        const dataToSend = {
            cartItems: cartItems.map(item => ({ 
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalAmount: totalAmount,
        };

        try {
            // Paso 1: Envía el pedido al backend de Flask para su procesamiento y guardado en DB
            const response = await fetch('/api/process_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json(); // Espera la respuesta JSON del backend

            if (response.ok) { // Si el backend responde con éxito (código 2xx)
                // Paso 2: Si el pedido se guardó correctamente, procede con el envío del email via EmailJS
                const customerEmail = emailInput.value;
                const customerName = cardNameInput ? cardNameInput.value : 'Cliente GlobalTurismo'; // Obtiene el nombre del titular o un valor por defecto

                // Construcción del cuerpo HTML profesional para el email
                const emailHtmlBody = `
                    <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e0e0e0;">
                        <div style="background-color: #0070e7; color: #ffffff; padding: 25px; text-align: center; font-size: 24px; font-weight: bold;">
                            GlobalTurismo
                        </div>
                        <div style="padding: 30px;">
                            <p style="font-size: 16px; color: #333333; margin-bottom: 15px;">Hola, <strong style="color: #0070e7;">${customerName}</strong>,</p>
                            <p style="font-size: 16px; color: #333333; margin-bottom: 25px;">¡Gracias por tu compra en GlobalTurismo! Tu pedido ha sido confirmado.</p>
                            
                            <h3 style="font-size: 18px; color: #0070e7; margin-bottom: 15px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">Resumen de tu Pedido #<span style="color: #28a745;">${result.pedido_id || 'N/A'}</span></h3>
                            
                            <ul style="list-style-type: none; padding: 0; margin: 0; border: 1px solid #f0f0f0; border-radius: 5px; background-color: #f9f9f9;">
                                ${cartItems.map(item => `
                                    <li style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; display: flex; justify-content: space-between; align-items: center; font-size: 15px; color: #555555;">
                                        <span><strong>${item.name}</strong> (x${item.quantity})</span>
                                        <span style="font-weight: bold; color: #28a745;">$${(item.price * item.quantity).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </li>
                                `).join('')}
                                <li style="padding: 12px 15px; background-color: #e6f7ff; text-align: right; font-size: 17px; font-weight: bold; color: #0070e7;">
                                    Total Abonado: <span style="color: #28a745;">$${totalAmount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </li>
                            </ul>
                            
                            <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 30px;">
                                En breve recibirás más detalles sobre tu viaje.
                            </p>
                            <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 10px;">
                                ¡Esperamos que disfrutes tu próxima aventura con GlobalTurismo!
                            </p>
                        </div>
                        <div style="background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee;">
                            &copy; 2025 GlobalTurismo. Todos los derechos reservados.
                        </div>
                    </div>
                `;

                const templateParams = {
                    to_email: customerEmail,
                    order_id: result.pedido_id, 
                    customer_name: customerName,
                    message_html: emailHtmlBody, // <--- ¡CAMBIO AQUÍ! Ahora coincide con tu plantilla
                    total_amount: totalAmount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), // Puedes mantener esta si tu plantilla la usa por separado
                };

                try {
                    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                    // Usamos un alert simple, considera un modal personalizado para mejor UX
                    alert(`¡Pago confirmado! Se ha enviado un ticket de compra a tu email: ${customerEmail}`);
                } catch (emailError) {
                    console.error('Error al enviar el email:', emailError);
                    alert('Pago confirmado, pero hubo un error al enviar el email. Por favor, inténtalo de nuevo o revisa tu bandeja de spam.');
                }

                // Limpiar el carrito y el almacenamiento local después de la compra exitosa
                localStorage.removeItem('shoppingCart');
                localStorage.removeItem('checkoutTotal');
                localStorage.removeItem('checkoutCart');
                
                // Redirigir al inicio después de la confirmación
                window.location.href = '/'; 
            } else {
                // Si el backend devuelve un error
                alert(`Error al procesar el pago: ${result.error || 'Mensaje de error desconocido.'}`);
            }
        } catch (error) {
            // Si hay un error de red o de comunicación con el servidor
            console.error('Error de red o del servidor:', error);
            alert('Hubo un error de conexión. Por favor, inténtalo de nuevo.');
        }
    });
});