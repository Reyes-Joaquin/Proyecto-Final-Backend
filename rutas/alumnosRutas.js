const express = require("express");
const axios = require("axios");
const Alumno = require("../models/alumnos");
const alumnosController = require("../controllers/alumnosController");

const alumnosRutas = express.Router();

const validarID = (req, res, next) => {
    const alumnoId = req.params.id;
    if (!alumnoId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: "ID de alumno inválido" });
    }
    next();
};

alumnosRutas.get("/alumnos", alumnosController.obtenerAlumnos);

alumnosRutas.post("/alumno", alumnosController.crearAlumno);

alumnosRutas.put("/alumno/:id", validarID, alumnosController.actualizarAlumno);

alumnosRutas.delete("/alumno/:id", validarID, alumnosController.eliminarAlumno);

module.exports = alumnosRutas;