const express = require("express");

const router = express.Router();

const adminController =
    require("../controllers/adminController");


router.post(
    "/crear",
    adminController.crearAdministrador
);


module.exports = router;