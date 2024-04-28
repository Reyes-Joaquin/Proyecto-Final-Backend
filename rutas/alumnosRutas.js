const express = require("express");
const axios = require("axios");
const Alumno = require("../models/alumnos"); // Cambio para utilizar el modelo correcto
const alumnosController = require("../controllers/alumnosController"); // Cambio para importar el controlador correcto

const alumnosRutas = express.Router();

const validarID = (req, res, next) => {
    const alumnoId = req.params.id;
    if (!alumnoId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: "ID de alumno inválido" });
    }
    next();
};

alumnosRutas.get("/alumno/:id", validarID, async (req, res) => {
    try {
        const alumnoId = req.params.id;
        const alumno = await Alumno.findById(alumnoId);

        if (!alumno) {
            return res.status(404).json({ success: false, message: "Alumno no encontrado" });
        }

        return res.status(200).json({ success: true, alumno });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});

alumnosRutas.post("/alumno", validateAlumno, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
        const { name, surname, age } = req.body;
        let alumno = new Alumno({
            name,
            surname,
            age,
        });
        await alumno.save();
        return res.status(200).send({
            success: true,
            message: "Alumno creado correctamente",
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

alumnosRutas.put("/alumno/:id", validarID, async (req, res) => {
    try {
        const { name, surname, age } = req.body;
        const alumnoId = req.params.id;

        if (!alumnoId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "ID de alumno inválido" });
        }

        const alumno = await Alumno.findByIdAndUpdate(alumnoId, { name, surname, age }, { new: true });

        if (!alumno) {
            return res.status(404).json({ success: false, message: "Alumno no encontrado" });
        }

        return res.status(200).json({ success: true, message: "Alumno actualizado correctamente", alumno });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});


alumnosRutas.get("/alumnos", alumnosController.obtenerAlumnos);

alumnosRutas.post("/alumno", alumnosController.crearAlumno);

alumnosRutas.put("/alumno/:id", validarID, alumnosController.actualizarAlumno);

alumnosRutas.delete("/alumno/:id", validarID, alumnosController.eliminarAlumno);

module.exports = alumnosRutas;