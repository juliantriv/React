const express = require("express");

const router = express.Router();

const vehiculoController =
    require("../controllers/vehiculoController");


const {
    verificarToken,
    verificarAdministrador
} = require("../middleware/authMiddleware");


// ==========================================
// OBTENER VEHÍCULOS
// ==========================================

router.get(
    "/",
    verificarToken,
    verificarAdministrador,
    vehiculoController.obtenerVehiculos
);


// ==========================================
// CREAR VEHÍCULO
// ==========================================

router.post(
    "/",
    verificarToken,
    verificarAdministrador,
    vehiculoController.crearVehiculo
);


// ==========================================
// ACTUALIZAR VEHÍCULO
// ==========================================

router.put(
    "/:id",
    verificarToken,
    verificarAdministrador,
    vehiculoController.actualizarVehiculo
);


// ==========================================
// ELIMINAR VEHÍCULO
// ==========================================

router.delete(
    "/:id",
    verificarToken,
    verificarAdministrador,
    vehiculoController.eliminarVehiculo
);


module.exports = router;