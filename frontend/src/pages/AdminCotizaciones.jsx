import { useEffect, useState } from "react";
import BotonVolver from "../components/BotonVolver";
import {
    obtenerCotizaciones,
    cambiarEstadoCotizacion
} from "../services/cotizacionAdminService";



function AdminCotizaciones() {

    const [cotizaciones, setCotizaciones] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");


    // =========================================
    // CARGAR COTIZACIONES
    // =========================================

    const cargarCotizaciones = async () => {

        try {

            setCargando(true);

            const datos =
                await obtenerCotizaciones();

            setCotizaciones(datos);

            setError("");

        } catch (error) {

            console.error(error);

            setError(
                "No fue posible cargar las cotizaciones"
            );

        } finally {

            setCargando(false);

        }

    };


    useEffect(() => {

        cargarCotizaciones();

    }, []);


    // =========================================
    // CAMBIAR ESTADO
    // =========================================

    const actualizarEstado = async (
        id,
        estado_id
    ) => {

        try {

            await cambiarEstadoCotizacion(
                id,
                estado_id
            );


            await cargarCotizaciones();


        } catch (error) {

            console.error(error);

            setError(
                "No fue posible actualizar el estado"
            );

        }

    };


    return (

        <main className="page-container">
            <BotonVolver />

            <section className="form-header">

                <span className="hero-tag">
                    CARTUG'S
                </span>

                <h1>
                    Cotizaciones
                </h1>

                <p>
                    Administración de las solicitudes
                    recibidas.
                </p>

            </section>


            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {cargando ? (

                <p>
                    Cargando cotizaciones...
                </p>

            ) : cotizaciones.length === 0 ? (

                <div className="service-card">

                    <h3>
                        No hay cotizaciones
                    </h3>

                    <p>
                        Actualmente no existen
                        solicitudes registradas.
                    </p>

                </div>

            ) : (

                <div className="admin-table-container">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>
                                    Cliente
                                </th>

                                <th>
                                    Vehículo
                                </th>

                                <th>
                                    Origen
                                </th>

                                <th>
                                    Destino
                                </th>

                                <th>
                                    Fecha
                                </th>

                                <th>
                                    Estado
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {cotizaciones.map(
                                (cotizacion) => (

                                    <tr
                                        key={
                                            cotizacion.id
                                        }
                                    >

                                        <td>

                                            <strong>
                                                {
                                                    cotizacion.nombre_cliente
                                                }
                                            </strong>

                                            <br />

                                            <small>
                                                {
                                                    cotizacion.correo_cliente
                                                }
                                            </small>

                                        </td>


                                        <td>

                                            {
                                                cotizacion.marca_vehiculo
                                            }

                                            {" "}

                                            {
                                                cotizacion.modelo_vehiculo
                                            }

                                            <br />

                                            <small>
                                                Año: {
                                                    cotizacion.anio_vehiculo
                                                }
                                            </small>

                                        </td>


                                        <td>
                                            {
                                                cotizacion.origen
                                            }
                                        </td>


                                        <td>
                                            {
                                                cotizacion.destino
                                            }
                                        </td>


                                        <td>
                                            {
                                                cotizacion.fecha_servicio
                                            }
                                        </td>


                                        <td>

                                            <select

                                                value={
                                                    cotizacion.estado ===
                                                    "pendiente"
                                                        ? 1
                                                        : cotizacion.estado ===
                                                          "en_revision"
                                                        ? 2
                                                        : cotizacion.estado ===
                                                          "aprobada"
                                                        ? 3
                                                        : cotizacion.estado ===
                                                          "rechazada"
                                                        ? 4
                                                        : 5
                                                }

                                                onChange={(
                                                    e
                                                ) =>
                                                    actualizarEstado(
                                                        cotizacion.id,
                                                        Number(
                                                            e.target.value
                                                        )
                                                    )
                                                }

                                            >

                                                <option value="1">
                                                    Pendiente
                                                </option>

                                                <option value="2">
                                                    En revisión
                                                </option>

                                                <option value="3">
                                                    Aprobada
                                                </option>

                                                <option value="4">
                                                    Rechazada
                                                </option>

                                                <option value="5">
                                                    Finalizada
                                                </option>

                                            </select>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </main>

    );

}

export default AdminCotizaciones;