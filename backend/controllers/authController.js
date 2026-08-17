const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const database = require("../config/database");


// ==========================================
// INICIAR SESIÓN
// ==========================================

const iniciarSesion = async (req, res) => {

    try {

        const { correo, password } = req.body;


        // Validar información

        if (!correo || !password) {

            return res.status(400).json({
                mensaje: "El correo y la contraseña son obligatorios"
            });

        }


        // Buscar usuario

        const [usuarios] = await database.query(`
            SELECT
                u.id,
                u.nombre,
                u.correo,
                u.password,
                u.estado,
                r.id AS rol_id,
                r.nombre AS rol
            FROM usuarios u
            INNER JOIN roles r
                ON u.rol_id = r.id
            WHERE u.correo = ?
            LIMIT 1
        `, [correo]);


        // Usuario no encontrado

        if (usuarios.length === 0) {

            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });

        }


        const usuario = usuarios[0];


        // Verificar estado

        if (usuario.estado !== "activo") {

            return res.status(403).json({
                mensaje: "El usuario se encuentra inactivo"
            });

        }


        // Comparar contraseña

        const passwordCorrecta =
            await bcrypt.compare(
                password,
                usuario.password
            );


        if (!passwordCorrecta) {

            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });

        }


        // Crear token

        const token = jwt.sign(

            {
                id: usuario.id,
                correo: usuario.correo,
                rol_id: usuario.rol_id,
                rol: usuario.rol
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "8h"
            }

        );


        res.json({

            mensaje: "Inicio de sesión exitoso",

            token,

            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });

    }

};


module.exports = {
    iniciarSesion
};