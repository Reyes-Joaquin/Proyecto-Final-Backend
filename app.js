const express = require("express");
const mongoose  = require("mongoose");
const app = express();
require("dotenv").config();

const alumnosRutas= require("./rutas/alumnosRutas")

app.use(express.json({extended: true}));

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
