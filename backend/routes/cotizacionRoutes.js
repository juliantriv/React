const express = require("express");

const router = express.Router();

const cotizacionController =
    require("../controllers/cotizacionController");

const {
    verificarToken,
    verificarAdministrador
} = require("../middleware/authMiddleware");


// ==========================================
// OBTENER COTIZACIONES
// SOLO ADMINISTRADOR
// ==========================================

router.get(
    "/",
    verificarToken,
    verificarAdministrador,
    cotizacionController.obtenerCotizaciones
);


// ==========================================
// CREAR COTIZACIÓN
// PÚBLICA
// ==========================================

router.post(
    "/",
    cotizacionController.crearCotizacion
);


// ==========================================
// CAMBIAR ESTADO
// SOLO ADMINISTRADOR
// ==========================================

router.put(
    "/:id/estado",
    verificarToken,
    verificarAdministrador,
    cotizacionController.cambiarEstado
);


module.exports = router;