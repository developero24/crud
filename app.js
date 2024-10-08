// app.js
const express = require('express');
const mongoose = require('mongoose');
const empleadoRoutes = require('./routes/empleado');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/empleados', authenticateToken, empleadoRoutes);
app.use('/auth', authRoutes);

// URL de conexión de MongoDB Atlas
// Reemplaza <usuario>, <password>, y <nombre_del_clúster> con tus credenciales reales y el nombre del clúster
const mongoURL = 'mongodb+srv://developero:<JM''9AfPteubG3q>@cluster0.wkgpe.mongodb.net/';

// Conexión a MongoDB Atlas sin opciones obsoletas
mongoose.connect(mongoURL)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(error => console.error('Error al conectar a MongoDB Atlas:', error));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


