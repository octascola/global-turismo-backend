document.addEventListener('DOMContentLoaded', () => {
    // Manejo del formulario de registro
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            try {
                const response = await fetch('/api/register', { // Ruta a tu endpoint de registro en Flask
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nombre: name, email: email, contraseña: password }),
                });

                const data = await response.json();

                if (response.ok) {
                    registerMessage.textContent = data.mensaje + '. Redirigiendo a login...';
                    registerMessage.style.color = 'green';
                    setTimeout(() => {
                        window.location.href = '/login'; // Redirige a la página de login
                    }, 2000);
                } else {
                    registerMessage.textContent = data.error || 'Error en el registro';
                    registerMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                registerMessage.textContent = 'Error de conexión con el servidor.';
                registerMessage.style.color = 'red';
            }
        });
    }

    // Manejo del formulario de login
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch('/api/login', { // Ruta a tu endpoint de login en Flask
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, contraseña: password }),
                });

                const data = await response.json();

                if (response.ok) {
                    loginMessage.textContent = data.mensaje + '. Redirigiendo a inicio...';
                    loginMessage.style.color = 'green';
                    setTimeout(() => {
                        window.location.href = '/'; // Redirige a la página principal (home)
                    }, 1500);
                } else {
                    loginMessage.textContent = data.error || 'Error al iniciar sesión';
                    loginMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                loginMessage.textContent = 'Error de conexión con el servidor.';
                loginMessage.style.color = 'red';
            }
        });
    }

    // Manejo del botón de Logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/logout', { // Ruta a tu endpoint de logout en Flask
                    method: 'GET', // O 'POST' si prefieres
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.mensaje);
                    window.location.href = '/'; // Redirige al inicio después del logout
                } else {
                    alert(data.error || 'Error al cerrar sesión.');
                }
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
                alert('Error de conexión al intentar cerrar sesión.');
            }
        });
    }
});