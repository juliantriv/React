const database = require("../config/database");

// Obtener todas las cotizaciones
const obtenerCotizaciones = async () => {

    const [cotizaciones] = await database.query(`
        SELECT
            c.id,
            c.nombre_cliente,
            c.correo_cliente,
            c.telefono_cliente,
            c.marca_vehiculo,
            c.modelo_vehiculo,
            c.anio_vehiculo,
            c.origen,
            c.destino,
            c.fecha_servicio,
            c.comentarios,
            c.fecha_creacion,
            e.nombre AS estado
        FROM cotizaciones c
        INNER JOIN estados_cotizacion e
            ON c.estado_id = e.id
        ORDER BY c.fecha_creacion DESC
    `);

    return cotizaciones;
};


// Crear una cotización
const crearCotizacion = async (cotizacion) => {

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
    } = cotizacion;

    // Estado inicial: pendiente
    const [estado] = await database.query(`
        SELECT id
        FROM estados_cotizacion
        WHERE nombre = 'pendiente'
        LIMIT 1
    `);

    if (estado.length === 0) {
        throw new Error("No existe el estado pendiente");
    }

    const estado_id = estado[0].id;

    const [resultado] = await database.query(`
        INSERT INTO cotizaciones (
            nombre_cliente,
            correo_cliente,
            telefono_cliente,
            marca_vehiculo,
            modelo_vehiculo,
            anio_vehiculo,
            origen,
            destino,
            fecha_servicio,
            comentarios,
            estado_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        nombre_cliente,
        correo_cliente,
        telefono_cliente,
        marca_vehiculo,
        modelo_vehiculo,
        anio_vehiculo,
        origen,
        destino,
        fecha_servicio,
        comentarios,
        estado_id
    ]);

    return resultado.insertId;
};


// Cambiar estado de una cotización
const cambiarEstado = async (id, estado_id) => {

    const [resultado] = await database.query(`
        UPDATE cotizaciones
        SET estado_id = ?
        WHERE id = ?
    `, [estado_id, id]);

    return resultado.affectedRows;
};


module.exports = {
    obtenerCotizaciones,
    crearCotizacion,
    cambiarEstado
};