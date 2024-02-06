const express = require("express");
const mongoose  = require("mongoose");
const app = express();
require("dotenv").config();

const alumnosRutas= require("./rutas/alumnosRutas")

app.use(express.json({extended: true}));

app.get("/hora-mundial", async (req, res) => {
    try {
        const response = await axios.get("https://www.timeapi.io/api/TimeZone/AvailableTimeZones");

        const zonasHorarias = response.data;

        return res.status(200).json({ success: true, zonasHorarias });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error al obtener las zonas horarias disponibles" });
    }
});

app.use("/api", alumnosRutas)

const URL = process.env.MONGO_DB
mongoose
    .connect(URL, {})
    .then(() => {
        console.log("BD is now connected");
    })
    .catch((err) => {
        console.log(err);
    });

    app.listen(5000, () => {
    console.log ("Servidor a la escucha en el puerto 5000")
});
