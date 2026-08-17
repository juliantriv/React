const database = require("../config/database");


// ==========================================
// OBTENER NÓMINAS
// ==========================================

const obtenerNominas = async (req, res) => {

    try {

        const [nominas] = await database.query(`

            SELECT
                n.id,
                n.empleado_id,
                e.documento,
                e.nombre,
                e.apellido,
                e.cargo,
                n.periodo,
                n.salario_base,
                n.bonificaciones,
                n.deducciones,
                n.salario_neto,
                n.estado,
                n.fecha_pago,
                n.fecha_registro

            FROM nominas n

            INNER JOIN empleados e
                ON n.empleado_id = e.id

            ORDER BY n.id DESC

        `);


        res.json(nominas);


    } catch (error) {

        console.error(error);


        res.status(500).json({

            mensaje:
                "Error al obtener las nóminas"

        });

    }

};


// ==========================================
// CREAR NÓMINA
// ==========================================

const crearNomina = async (req, res) => {

    try {

        const {

            empleado_id,
            periodo,
            salario_base,
            bonificaciones,
            deducciones

        } = req.body;


        // ==================================
        // VALIDACIONES
        // ==================================

        if (
            !empleado_id ||
            !periodo ||
            salario_base === undefined
        ) {

            return res.status(400).json({

                mensaje:
                    "Empleado, período y salario base son obligatorios"

            });

        }


        // ==================================
        // CONVERTIR VALORES
        // ==================================

        const salario =
            Number(salario_base);

        const bonos =
            Number(bonificaciones || 0);

        const descuentos =
            Number(deducciones || 0);


        // ==================================
        // CALCULAR SALARIO NETO
        // ==================================

        const salarioNeto =
            salario +
            bonos -
            descuentos;


        // ==================================
        // VALIDAR RESULTADO
        // ==================================

        if (salarioNeto < 0) {

            return res.status(400).json({

                mensaje:
                    "Las deducciones no pueden superar el total de ingresos"

            });

        }


        // ==================================
        // VERIFICAR EMPLEADO
        // ==================================

        const [empleados] =
            await database.query(`

                SELECT
                    id,
                    nombre,
                    apellido

                FROM empleados

                WHERE id = ?

            `, [empleado_id]);


        if (empleados.length === 0) {

            return res.status(404).json({

                mensaje:
                    "El empleado no existe"

            });

        }


        // ==================================
        // INSERTAR NÓMINA
        // ==================================

        const [resultado] =
            await database.query(`

                INSERT INTO nominas (

                    empleado_id,
                    periodo,
                    salario_base,
                    bonificaciones,
                    deducciones,
                    salario_neto

                )

                VALUES (?, ?, ?, ?, ?, ?)

            `, [

                empleado_id,
                periodo,
                salario,
                bonos,
                descuentos,
                salarioNeto

            ]);


        res.status(201).json({

            mensaje:
                "Nómina creada correctamente",

            id:
                resultado.insertId,

            salario_neto:
                salarioNeto

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({

            mensaje:
                "Error al crear la nómina"

        });

    }

};


// ==========================================
// CAMBIAR ESTADO DE NÓMINA
// ==========================================

const cambiarEstadoNomina = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;


        const {
            estado,
            fecha_pago
        } = req.body;


        const estadosPermitidos = [

            "pendiente",
            "pagada",
            "cancelada"

        ];


        if (
            !estadosPermitidos.includes(
                estado
            )
        ) {

            return res.status(400).json({

                mensaje:
                    "Estado de nómina inválido"

            });

        }


        let fechaPagoFinal =
            fecha_pago || null;


        if (estado === "pagada" &&
            !fechaPagoFinal) {

            fechaPagoFinal =
                new Date()
                    .toISOString()
                    .split("T")[0];

        }


        const [resultado] =
            await database.query(`

                UPDATE nominas

                SET
                    estado = ?,
                    fecha_pago = ?

                WHERE id = ?

            `, [

                estado,
                fechaPagoFinal,
                id

            ]);


        if (
            resultado.affectedRows === 0
        ) {

            return res.status(404).json({

                mensaje:
                    "Nómina no encontrada"

            });

        }


        res.json({

            mensaje:
                "Estado de nómina actualizado"

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({

            mensaje:
                "Error al actualizar la nómina"

        });

    }

};


module.exports = {

    obtenerNominas,
    crearNomina,
    cambiarEstadoNomina

};