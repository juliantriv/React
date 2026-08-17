const database = require("../config/database");


// ==========================================
// OBTENER EMPLEADOS
// ==========================================

const obtenerEmpleados = async (req, res) => {

    try {

        const [empleados] = await database.query(`
            SELECT
                id,
                documento,
                nombre,
                apellido,
                telefono,
                correo,
                cargo,
                salario_base,
                fecha_ingreso,
                estado,
                fecha_registro
            FROM empleados
            ORDER BY id DESC
        `);

        res.json(empleados);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener los empleados"
        });

    }

};


// ==========================================
// CREAR EMPLEADO
// ==========================================

const crearEmpleado = async (req, res) => {

    try {

        const {
            documento,
            nombre,
            apellido,
            telefono,
            correo,
            cargo,
            salario_base,
            fecha_ingreso,
            estado
        } = req.body;


        if (
            !documento ||
            !nombre ||
            !apellido ||
            !cargo ||
            !salario_base ||
            !fecha_ingreso
        ) {

            return res.status(400).json({
                mensaje:
                    "Documento, nombre, apellido, cargo, salario y fecha de ingreso son obligatorios"
            });

        }


        const [resultado] = await database.query(`

            INSERT INTO empleados (
                documento,
                nombre,
                apellido,
                telefono,
                correo,
                cargo,
                salario_base,
                fecha_ingreso,
                estado
            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

        `, [

            documento,
            nombre,
            apellido,
            telefono || null,
            correo || null,
            cargo,
            salario_base,
            fecha_ingreso,
            estado || "activo"

        ]);


        res.status(201).json({

            mensaje:
                "Empleado registrado correctamente",

            id:
                resultado.insertId

        });


    } catch (error) {

        console.error(error);


        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({

                mensaje:
                    "Ya existe un empleado con ese documento"

            });

        }


        res.status(500).json({

            mensaje:
                "Error al registrar el empleado"

        });

    }

};


// ==========================================
// ACTUALIZAR EMPLEADO
// ==========================================

const actualizarEmpleado = async (req, res) => {

    try {

        const { id } = req.params;


        const {
            documento,
            nombre,
            apellido,
            telefono,
            correo,
            cargo,
            salario_base,
            fecha_ingreso,
            estado
        } = req.body;


        const [resultado] = await database.query(`

            UPDATE empleados

            SET
                documento = ?,
                nombre = ?,
                apellido = ?,
                telefono = ?,
                correo = ?,
                cargo = ?,
                salario_base = ?,
                fecha_ingreso = ?,
                estado = ?

            WHERE id = ?

        `, [

            documento,
            nombre,
            apellido,
            telefono || null,
            correo || null,
            cargo,
            salario_base,
            fecha_ingreso,
            estado,
            id

        ]);


        if (resultado.affectedRows === 0) {

            return res.status(404).json({

                mensaje:
                    "Empleado no encontrado"

            });

        }


        res.json({

            mensaje:
                "Empleado actualizado correctamente"

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje:
                "Error al actualizar el empleado"

        });

    }

};


// ==========================================
// ELIMINAR EMPLEADO
// ==========================================

const eliminarEmpleado = async (req, res) => {

    try {

        const { id } = req.params;


        const [resultado] = await database.query(`

            DELETE FROM empleados

            WHERE id = ?

        `, [id]);


        if (resultado.affectedRows === 0) {

            return res.status(404).json({

                mensaje:
                    "Empleado no encontrado"

            });

        }


        res.json({

            mensaje:
                "Empleado eliminado correctamente"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje:
                "Error al eliminar el empleado"

        });

    }

};


module.exports = {

    obtenerEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado

};
