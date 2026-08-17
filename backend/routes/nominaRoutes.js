const express = require("express");

const router = express.Router();


const nominaController =
    require("../controllers/nominaController");


const {
    verificarToken,
    verificarAdministrador
} = require("../middleware/authMiddleware");


// ==========================================
// OBTENER NÓMINAS
// ==========================================

router.get(
    "/",
    verificarToken,
    verificarAdministrador,
    nominaController.obtenerNominas
);


// ==========================================
// CREAR NÓMINA
// ==========================================

router.post(
    "/",
    verificarToken,
    verificarAdministrador,
    nominaController.crearNomina
);


// ==========================================
// CAMBIAR ESTADO
// ==========================================

router.put(
    "/:id/estado",
    verificarToken,
    verificarAdministrador,
    nominaController.cambiarEstadoNomina
);


module.exports = router;