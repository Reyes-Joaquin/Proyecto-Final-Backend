const Alumno = require("../database/alumnos");

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

exports.actualizarAlumno = async (req, res) => {
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
};

exports.eliminarAlumno = async (req, res) => {
    try {
        const alumnoId = req.params.id;

        if (!alumnoId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "ID de alumno inválido" });
        }
        
        const alumno = await Alumno.findByIdAndDelete(alumnoId);

        if (!alumno) {
            return res.status(404).json({ success: false, message: "Alumno no encontrado" });
        }

        return res.status(200).json({ success: true, message: "Alumno eliminado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};
