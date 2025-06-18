import sqlite3

def init_db_script():
    conn = sqlite3.connect('base_turismo.db')
    cursor = conn.cursor()

    # Tabla clientes
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        contraseña TEXT NOT NULL
    )
    ''')

    # Tabla productos (ajustada para el contexto de turismo)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        precio REAL NOT NULL,
        imagen_url TEXT, -- Puedes añadir una URL de imagen para el paquete
        categoria TEXT,   -- Ej: "Nacional", "Internacional", "Aventura"
        salida TEXT,      -- Ej: "Buenos Aires", "Córdoba"
        noches INTEGER    -- Número de noches
    )
    ''')

    # Tabla pedidos (para el historial de compras general)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
        total REAL NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    )
    ''')

    # Tabla detalle_pedido (para los ítems específicos dentro de cada pedido)
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
    print("Base de datos 'base_turismo.db' y tablas creadas/verificadas con éxito.")

if __name__ == '__main__':
    init_db_script()