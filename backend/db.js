const sqlite3 = require('sqlite3').verbose();

// Conexión a la base de datos
const db = new sqlite3.Database('./cybernest.db', (err) => {
    if (err) {
        console.error("❌ Error al abrir DB:", err.message);
    } else {
        console.log("🗄️  Base de datos SQLite conectada.");
    }
});

// Crear tabla de contactos (Solo se ejecuta si no existe)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contactos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        tipo_negocio TEXT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error("❌ Error al crear tabla:", err.message);
    });
});

module.exports = db;