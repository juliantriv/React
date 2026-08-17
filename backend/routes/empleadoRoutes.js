const express = require("express");

const router = express.Router();

const empleadoController =
    require("../controllers/empleadoController");


const {
    verificarToken,
    verificarAdministrador
} = require("../middleware/authMiddleware");


// ==========================================
// OBTENER EMPLEADOS
// ==========================================

router.get(
    "/",
    verificarToken,
    verificarAdministrador,
    empleadoController.obtenerEmpleados
);


// ==========================================
// CREAR EMPLEADO
// ==========================================

router.post(
    "/",
    verificarToken,
    verificarAdministrador,
    empleadoController.crearEmpleado
);


// ==========================================
// ACTUALIZAR EMPLEADO
// ==========================================

router.put(
    "/:id",
    verificarToken,
    verificarAdministrador,
    empleadoController.actualizarEmpleado
);


// ==========================================
// ELIMINAR EMPLEADO
// ==========================================

router.delete(
    "/:id",
    verificarToken,
    verificarAdministrador,
    empleadoController.eliminarEmpleado
);


module.exports = router;