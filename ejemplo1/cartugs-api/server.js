const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Archivo server.js iniciado");



const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cartugsreact"
});


conexion.connect((error) => {

    if (error) {
        console.log("Error de conexión:", error);
    } else {
        console.log("Conectado a MySQL");
    }

});



app.post("/cotizaciones", (req, res) => {

    const datos = req.body;

    const sql = `
        INSERT INTO cotizaciones
        (nombre, email, telefono, marca, modelo, anio, origen, destino, fecha, comentarios)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const valores = [
        datos.nombre,
        datos.email,
        datos.telefono,
        datos.marca,
        datos.modelo,
        datos.anio,
        datos.origen,
        datos.destino,
        datos.fecha,
        datos.comentarios
    ];


    conexion.query(sql, valores, (error, resultado) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                mensaje: "Error al guardar"
            });

        }


        res.json({
            mensaje: "Cotización guardada correctamente",
            id: resultado.insertId
        });

    });

});

app.get("/", (req, res) => {
        res.send("Servidor Cartug's funcionando");
    });

app.listen(3000, () => {

    console.log("Servidor ejecutándose en http://localhost:3000");

});