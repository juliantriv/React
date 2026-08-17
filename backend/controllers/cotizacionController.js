const cotizacionModel = require("../models/cotizacionModel");


// ==========================================
// OBTENER COTIZACIONES
// ==========================================

const obtenerCotizaciones = async (req, res) => {

    try {

        const cotizaciones =
            await cotizacionModel.obtenerCotizaciones();

        res.json(cotizaciones);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener las cotizaciones"
        });
    }
};


// ==========================================
// CREAR COTIZACIÓN
// ==========================================

const crearCotizacion = async (req, res) => {

    try {

        const {
            nombre_cliente,
            correo_cliente,
            telefono_cliente,
            marca_vehiculo,
            modelo_vehiculo,
            anio_vehiculo,
            origen,
            destino,
            fecha_servicio,
            comentarios
        } = req.body;


        // Validaciones básicas

        if (
            !nombre_cliente ||
            !correo_cliente ||
            !telefono_cliente ||
            !marca_vehiculo ||
            !modelo_vehiculo ||
            !origen ||
            !destino ||
            !fecha_servicio
        ) {

            return res.status(400).json({
                mensaje: "Todos los campos obligatorios deben ser diligenciados"
            });
        }


        const id = await cotizacionModel.crearCotizacion({
            nombre_cliente,
            correo_cliente,
            telefono_cliente,
            marca_vehiculo,
            modelo_vehiculo,
            anio_vehiculo,
            origen,
            destino,
            fecha_servicio,
            comentarios
        });


        res.status(201).json({
            mensaje: "Cotización creada correctamente",
            id
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear la cotización"
        });
    }
};


// ==========================================
// CAMBIAR ESTADO
// ==========================================

const cambiarEstado = async (req, res) => {

    try {

        const { id } = req.params;
        const { estado_id } = req.body;


        if (!estado_id) {

            return res.status(400).json({
                mensaje: "Debe indicar el estado"
            });
        }


        const resultado =
            await cotizacionModel.cambiarEstado(
                id,
                estado_id
            );


        if (resultado === 0) {

            return res.status(404).json({
                mensaje: "Cotización no encontrada"
            });
        }


        res.json({
            mensaje: "Estado actualizado correctamente"
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al cambiar el estado"
        });
    }
};


module.exports = {
    obtenerCotizaciones,
    crearCotizacion,
    cambiarEstado
};