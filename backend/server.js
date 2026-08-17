const express = require("express");
const cors = require("cors");
require("dotenv").config();
const database = require("./config/database");
const cotizacionRoutes =
    require("./routes/cotizacionRoutes");
const authRoutes =
    require("./routes/authRoutes");
const adminRoutes =
    require("./routes/adminRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
const vehiculoRoutes =
    require("./routes/vehiculoRoutes");
const empleadoRoutes =
    require("./routes/empleadoRoutes");
const nominaRoutes =
    require("./routes/nominaRoutes");


// ==========================================
// MIDDLEWARES
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// RUTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {

    res.json({
        mensaje: "API de Cartug's funcionando correctamente"
    });

});


// ==========================================
// PRUEBA BASE DE DATOS
// ==========================================

app.get("/api/test-db", async (req, res) => {

    try {

        const [resultado] =
            await database.query(
                "SELECT 1 + 1 AS resultado"
            );

        res.json({
            mensaje: "Conexión con MySQL exitosa",
            resultado: resultado[0].resultado
        });

    } catch (error) {

        console.error("Error de conexión:", error);

        res.status(500).json({
            mensaje: "Error al conectar con MySQL",
            error: error.message
        });

    }

});


// ==========================================
// RUTAS DE COTIZACIONES
// ==========================================

app.use(
    "/api/cotizaciones",
    cotizacionRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

app.use(
    "/api/vehiculos",
    vehiculoRoutes
);

app.use(
    "/api/empleados",
    empleadoRoutes
);

app.use(
    "/api/nominas",
    nominaRoutes
);


// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );

});

