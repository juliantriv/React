const express = require("express");

const router = express.Router();

const authController =
    require("../controllers/authController");


// ==========================================
// INICIO DE SESIÓN
// ==========================================

router.post(
    "/login",
    authController.iniciarSesion
);


module.exports = router;