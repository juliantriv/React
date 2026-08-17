const bcrypt = require("bcryptjs");

const database = require("../config/database");


// ==========================================
// CREAR ADMINISTRADOR
// ==========================================

const crearAdministrador = async (req, res) => {

    try {

        const nombre = "Administrador Cartug's";

        const correo = "admin@cartugs.com";

        const password = "Admin123";


        // Obtener rol administrador

        const [roles] = await database.query(`
            SELECT id
            FROM roles
            WHERE nombre = 'administrador'
            LIMIT 1
        `);


        if (roles.length === 0) {

            return res.status(500).json({
                mensaje: "No existe el rol administrador"
            });

        }


        const rol_id = roles[0].id;


        // Encriptar contraseña

        const passwordHash =
            await bcrypt.hash(password, 10);


        // Insertar administrador

        const [resultado] = await database.query(`
            INSERT INTO usuarios (
                nombre,
                correo,
                password,
                rol_id,
                estado
            )
            VALUES (?, ?, ?, ?, 'activo')
        `, [

            nombre,
            correo,
            passwordHash,
            rol_id

        ]);


        res.status(201).json({

            mensaje: "Administrador creado correctamente",

            id: resultado.insertId,

            correo,

            password

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje: "Error al crear administrador",

            error: error.message

        });

    }

};


module.exports = {
    crearAdministrador
};