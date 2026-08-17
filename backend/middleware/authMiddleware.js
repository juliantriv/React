const jwt = require("jsonwebtoken");


// ==========================================
// VERIFICAR TOKEN
// ==========================================

const verificarToken = (req, res, next) => {

    try {

        // Obtener autorización

        const autorizacion =
            req.headers.authorization;


        // Verificar que exista

        if (!autorizacion) {

            return res.status(401).json({
                mensaje: "No se proporcionó un token"
            });

        }


        // Comprobar formato Bearer

        if (!autorizacion.startsWith("Bearer ")) {

            return res.status(401).json({
                mensaje: "Formato de token inválido"
            });

        }


        // Extraer token

        const token =
            autorizacion.split(" ")[1];


        // Verificar JWT

        const usuario =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // Guardar usuario en request

        req.usuario = usuario;


        next();


    } catch (error) {

        console.error(error);

        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        });

    }

};


// ==========================================
// VERIFICAR ADMINISTRADOR
// ==========================================

const verificarAdministrador = (
    req,
    res,
    next
) => {

    if (
        !req.usuario ||
        req.usuario.rol !== "administrador"
    ) {

        return res.status(403).json({
            mensaje: "No tienes permisos de administrador"
        });

    }


    next();

};


module.exports = {
    verificarToken,
    verificarAdministrador
};