const database = require("../config/database");


// ==========================================
// OBTENER VEHÍCULOS
// ==========================================

const obtenerVehiculos = async (req, res) => {

    try {

        const [vehiculos] = await database.query(`
            SELECT
                id,
                placa,
                marca,
                modelo,
                anio,
                color,
                tipo,
                capacidad_kg,
                estado,
                fecha_registro
            FROM vehiculos
            ORDER BY id DESC
        `);


        res.json(vehiculos);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener los vehículos"
        });

    }

};


// ==========================================
// CREAR VEHÍCULO
// ==========================================

const crearVehiculo = async (req, res) => {

    try {

        const {
            placa,
            marca,
            modelo,
            anio,
            color,
            tipo,
            capacidad_kg,
            estado
        } = req.body;


        // Validaciones

        if (
            !placa ||
            !marca ||
            !modelo ||
            !tipo
        ) {

            return res.status(400).json({
                mensaje:
                    "Placa, marca, modelo y tipo son obligatorios"
            });

        }


        const [resultado] = await database.query(`

            INSERT INTO vehiculos (
                placa,
                marca,
                modelo,
                anio,
                color,
                tipo,
                capacidad_kg,
                estado
            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?)

        `, [

            placa.toUpperCase(),
            marca,
            modelo,
            anio || null,
            color || null,
            tipo,
            capacidad_kg || null,
            estado || "disponible"

        ]);


        res.status(201).json({

            mensaje:
                "Vehículo registrado correctamente",

            id:
                resultado.insertId

        });


    } catch (error) {

        console.error(error);


        // Placa duplicada

        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({

                mensaje:
                    "Ya existe un vehículo con esa placa"

            });

        }


        res.status(500).json({

            mensaje:
                "Error al registrar el vehículo"

        });

    }

};


// ==========================================
// ACTUALIZAR VEHÍCULO
// ==========================================

const actualizarVehiculo = async (req, res) => {

    try {

        const { id } = req.params;


        const {
            placa,
            marca,
            modelo,
            anio,
            color,
            tipo,
            capacidad_kg,
            estado
        } = req.body;


        const [resultado] = await database.query(`

            UPDATE vehiculos

            SET
                placa = ?,
                marca = ?,
                modelo = ?,
                anio = ?,
                color = ?,
                tipo = ?,
                capacidad_kg = ?,
                estado = ?

            WHERE id = ?

        `, [

            placa.toUpperCase(),
            marca,
            modelo,
            anio || null,
            color || null,
            tipo,
            capacidad_kg || null,
            estado,
            id

        ]);


        if (resultado.affectedRows === 0) {

            return res.status(404).json({

                mensaje:
                    "Vehículo no encontrado"

            });

        }


        res.json({

            mensaje:
                "Vehículo actualizado correctamente"

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje:
                "Error al actualizar el vehículo"

        });

    }

};


// ==========================================
// ELIMINAR VEHÍCULO
// ==========================================

const eliminarVehiculo = async (req, res) => {

    try {

        const { id } = req.params;


        const [resultado] = await database.query(`

            DELETE FROM vehiculos

            WHERE id = ?

        `, [id]);


        if (resultado.affectedRows === 0) {

            return res.status(404).json({

                mensaje:
                    "Vehículo no encontrado"

            });

        }


        res.json({

            mensaje:
                "Vehículo eliminado correctamente"

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje:
                "Error al eliminar el vehículo"

        });

    }

};


module.exports = {

    obtenerVehiculos,
    crearVehiculo,
    actualizarVehiculo,
    eliminarVehiculo

};