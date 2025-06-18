# app.py
from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import sqlite3
import os
from functools import wraps


# --- ESTO ES PARA DEPURACIÓN ---
print(f"Directorio de trabajo actual: {os.getcwd()}")
print(f"Contenido de 'css' existe: {os.path.exists('css')}")
print(f"Contenido de 'js' existe: {os.path.exists('js')}")
print(f"Archivo 'css/style.css' existe: {os.path.exists('css/style.css')}")
print(f"Archivo 'js/script.js' existe: {os.path.exists('js/script.js')}")
# --- FIN DEPURACIÓN ---

app = Flask(__name__,
            template_folder='.', # Los archivos HTML están en la raíz del proyecto
            static_folder='.',
            static_url_path='/') # <--- ¡ESTE ES EL CAMBIO NECESARIO para los 404 de CSS/JS!

# MUY IMPORTANTE: Genera una clave secreta fuerte y única para tu aplicación
# En producción, no uses os.urandom. Usa una variable de entorno o un archivo de configuración.
app.secret_key = os.urandom(24) # Necesario para manejar sesiones (cookies)

# --- Funciones de Base de Datos ---
def get_db_connection():
    conn = sqlite3.connect('base_turismo.db')
    conn.row_factory = sqlite3.Row  # Esto permite acceder a las columnas por nombre
    return conn

# Función para inicializar la base de datos (asegurarse de que las tablas existan)
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Crear tabla clientes
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        contraseña TEXT NOT NULL
    )
    ''')

    # Crear tabla productos (si aún no la tienes, para la sección de productos)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        precio REAL NOT NULL,
        imagen_url TEXT,
        categoria TEXT,
        salida TEXT,
        noches INTEGER
    )
    ''')

    # Crear tabla pedidos (historial de compras)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
        total REAL NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    )
    ''')

    # Crear tabla detalle_pedido (para almacenar los productos de cada pedido)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS detalle_pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedido_id INTEGER NOT NULL,
        producto_nombre TEXT NOT NULL,
        producto_precio REAL NOT NULL,
        cantidad INTEGER NOT NULL,
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
    )
    ''')

    conn.commit()
    conn.close()
    print("Base de datos y tablas verificadas/creadas con éxito al iniciar la app.")

# Asegurarse de que la DB se inicialice al arrancar la app
with app.app_context():
    init_db()

# --- Rutas de la Aplicación ---

# Ruta principal que sirve index.html
@app.route('/')
def home():
    logged_in = 'cliente_id' in session
    username = session.get('nombre_cliente', 'Invitado')
    return render_template('index.html', logged_in=logged_in, username=username)

# Ruta para la página de registro
@app.route('/register')
def register_page():
    logged_in = 'cliente_id' in session
    username = session.get('nombre_cliente', 'Invitado')
    return render_template('register.html', logged_in=logged_in, username=username)

# ✅ REGISTRO DE CLIENTE (API Endpoint)
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    nombre = data.get('nombre')
    email = data.get('email')
    contraseña = data.get('contraseña')

    if not (nombre and email and contraseña):
        return jsonify({'error': 'Faltan datos'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('INSERT INTO clientes (nombre, email, contraseña) VALUES (?, ?, ?)',
                       (nombre, email, contraseña))
        conn.commit()
        return jsonify({'mensaje': 'Registro exitoso'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Este email ya está registrado'}), 409 # Conflict
    except Exception as e:
        return jsonify({'error': f'Error en el registro: {str(e)}'}), 500
    finally:
        conn.close()

# Ruta para la página de login
@app.route('/login')
def login_page():
    logged_in = 'cliente_id' in session
    username = session.get('nombre_cliente', 'Invitado')
    return render_template('login.html', logged_in=logged_in, username=username)

# ✅ LOGIN DE CLIENTE (API Endpoint)
@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get('email')
    contraseña = data.get('contraseña')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id, nombre, email FROM clientes WHERE email = ? AND contraseña = ?', (email, contraseña))
    cliente = cursor.fetchone()
    conn.close()

    if cliente:
        session['cliente_id'] = cliente['id']
        session['nombre_cliente'] = cliente['nombre']
        return jsonify({'mensaje': 'Inicio de sesión exitoso', 'cliente': {'id': cliente['id'], 'nombre': cliente['nombre']}}), 200
    else:
        return jsonify({'error': 'Email o contraseña incorrectos'}), 401 # Unauthorized

# ✅ LOGOUT DE CLIENTE
@app.route('/api/logout')
def logout_user():
    session.pop('cliente_id', None)
    session.pop('nombre_cliente', None)
    return jsonify({'mensaje': 'Sesión cerrada exitosamente'}), 200

# ✅ HISTORIAL DE COMPRAS (ver pedidos)
@app.route('/orders')
def view_orders():
    if 'cliente_id' not in session:
        return redirect(url_for('login_page', message='Debes iniciar sesión para ver tus pedidos.'))

    cliente_id = session['cliente_id']
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT id, fecha_pedido, total FROM pedidos WHERE cliente_id = ? ORDER BY fecha_pedido DESC', (cliente_id,))
    pedidos = cursor.fetchall()

    pedidos_con_detalles = []
    for pedido in pedidos:
        cursor.execute('SELECT producto_nombre, producto_precio, cantidad FROM detalle_pedido WHERE pedido_id = ?', (pedido['id'],))
        detalles = cursor.fetchall()
        pedidos_con_detalles.append({
            'id': pedido['id'],
            'fecha_pedido': pedido['fecha_pedido'],
            'total': pedido['total'],
            'detalles': [{'nombre': d['producto_nombre'], 'precio': d['producto_precio'], 'cantidad': d['cantidad']} for d in detalles]
        })
    conn.close()
    
    logged_in = True # Si llegamos aquí, el usuario está logueado
    username = session.get('nombre_cliente')
    return render_template('orders.html', pedidos=pedidos_con_detalles, logged_in=logged_in, username=username)

# ✅ RUTA PARA PROCESAR EL PAGO (Guardar pedido)
@app.route('/api/process_payment', methods=['POST'])
def process_payment():
    if 'cliente_id' not in session:
        return jsonify({'error': 'No autorizado. Inicia sesión para comprar.'}), 401

    data = request.json
    cart_items = data.get('cartItems')
    total_amount = data.get('totalAmount')

    if not cart_items or total_amount is None:
        return jsonify({'error': 'Datos de carrito o total faltantes'}), 400

    cliente_id = session['cliente_id']
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('INSERT INTO pedidos (cliente_id, total) VALUES (?, ?)', (cliente_id, total_amount))
        pedido_id = cursor.lastrowid

        for item in cart_items:
            cursor.execute('''
                INSERT INTO detalle_pedido (pedido_id, producto_nombre, producto_precio, cantidad)
                VALUES (?, ?, ?, ?)
            ''', (pedido_id, item.get('name'), item.get('price'), item.get('quantity')))
        
        conn.commit()
        return jsonify({'mensaje': 'Pago procesado y pedido guardado exitosamente', 'pedido_id': pedido_id}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({'error': f'Error al procesar el pago: {str(e)}'}), 500
    finally:
        conn.close()

# Ruta para checkout.html
@app.route('/checkout.html')
def checkout_html_route():
    logged_in = 'cliente_id' in session
    username = session.get('nombre_cliente', 'Invitado')
    return render_template('checkout.html', logged_in=logged_in, username=username)

if __name__ == '__main__':
    app.run(debug=True)