const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importamos la conexión que hicimos arriba

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para recibir datos del formulario
app.post('/api/contacto', (req, res) => {
    const { nombre, whatsapp, tipo_negocio } = req.body;

    if (!nombre || !whatsapp) {
        return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    const query = `INSERT INTO contactos (nombre, whatsapp, tipo_negocio) VALUES (?, ?, ?)`;
    
    db.run(query, [nombre, whatsapp, tipo_negocio], function(err) {
        if (err) {
            console.error("❌ Error al insertar:", err.message);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        
        console.log(`✅ Nuevo cliente registrado: ${nombre} (${tipo_negocio})`);
        res.status(201).json({ 
            message: "Contacto guardado con éxito", 
            id: this.lastID 
        });
    });
});

// Endpoint para VER los contactos (Tu panel de control)
app.get('/api/clientes-secretos', (req, res) => {
    const sql = `SELECT * FROM contactos ORDER BY fecha DESC`;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});





app.listen(PORT, () => {
    console.log(`🚀 Servidor de Cyber Nest corriendo en http://localhost:${PORT}`);
});