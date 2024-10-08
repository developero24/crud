// routes/empleado.js
const express = require('express');
const router = express.Router();
const Empleado = require('../models/empleado');

// Crear un nuevo empleado
router.post('/', async (req, res) => {
    try {
        const nuevoEmpleado = new Empleado(req.body);
        const empleadoGuardado = await nuevoEmpleado.save();
        res.status(201).json(empleadoGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Leer todos los empleados
router.get('/', async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer un empleado por ID
router.get('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findById(req.params.id);
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un empleado
router.patch('/:id', async (req, res) => {
    try {
        const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!empleadoActualizado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json(empleadoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un empleado
router.delete('/:id', async (req, res) => {
    try {
        const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
        if (!empleadoEliminado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
