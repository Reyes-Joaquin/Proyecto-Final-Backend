const Alumno = require("../models/alumnos");

exports.obtenerAlumnos = async (req, res) => {
    try {
        let alumnos = await Alumno.find({});
        return res.status(200).send({
            success: true,
            alumnos,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error interno del servidor",
        });
    }
};

exports.crearAlumno = async (req, res) => {
    try {
        const { name, surname, age } = req.body;
        if (!name || !surname || !age) {
            return res.status(400).send({
                success: false,
                message: "FALTAN DATOS POR COMPLETAR",
            });
        }

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
};

// Otros controladores como actualizar y eliminar alumnos podrían ir aquí...

