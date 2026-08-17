import { useEffect, useState } from "react";
import BotonVolver from "../components/BotonVolver";
import {
    obtenerVehiculos,
    crearVehiculo,
    eliminarVehiculo
} from "../services/vehiculoService";



function AdminVehiculos() {

    const formularioInicial = {

        placa: "",
        marca: "",
        modelo: "",
        anio: "",
        color: "",
        tipo: "Grúa",
        capacidad_kg: "",
        estado: "disponible"

    };


    const [vehiculos, setVehiculos] =
        useState([]);


    const [formulario, setFormulario] =
        useState(formularioInicial);


    const [mostrarFormulario, setMostrarFormulario] =
        useState(false);


    const [cargando, setCargando] =
        useState(true);


    const [mensaje, setMensaje] =
        useState("");


    const [error, setError] =
        useState("");


    // =========================================
    // CARGAR VEHÍCULOS
    // =========================================

    const cargarVehiculos = async () => {

        try {

            setCargando(true);

            const datos =
                await obtenerVehiculos();

            setVehiculos(datos);

            setError("");

        } catch (error) {

            console.error(error);

            setError(
                "No fue posible cargar los vehículos"
            );

        } finally {

            setCargando(false);

        }

    };


    useEffect(() => {

        cargarVehiculos();

    }, []);


    // =========================================
    // CAMBIAR INPUT
    // =========================================

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setFormulario({

            ...formulario,

            [name]: value

        });

    };


    // =========================================
    // REGISTRAR VEHÍCULO
    // =========================================

    const manejarEnvio = async (e) => {

        e.preventDefault();

        setMensaje("");

        setError("");


        try {

            await crearVehiculo(formulario);


            setMensaje(
                "Vehículo registrado correctamente"
            );


            setFormulario(
                formularioInicial
            );


            setMostrarFormulario(false);


            await cargarVehiculos();


        } catch (error) {

            console.error(error);


            if (
                error.response &&
                error.response.data
            ) {

                setError(
                    error.response.data.mensaje
                );

            } else {

                setError(
                    "No fue posible registrar el vehículo"
                );

            }

        }

    };


    // =========================================
    // ELIMINAR
    // =========================================

    const manejarEliminar = async (id) => {

        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar este vehículo?"
        );


        if (!confirmar) {
            return;
        }


        try {

            await eliminarVehiculo(id);


            setMensaje(
                "Vehículo eliminado correctamente"
            );


            await cargarVehiculos();


        } catch (error) {

            console.error(error);

            setError(
                "No fue posible eliminar el vehículo"
            );

        }

    };


    return (

        <main className="page-container">
            
            <BotonVolver />

            {/* =================================
                ENCABEZADO
            ================================== */}

            <section className="admin-header">

                <div>

                    <span className="hero-tag">
                        CARTUG'S
                    </span>

                    <h1>
                        Vehículos
                    </h1>

                    <p>
                        Administración de la flota
                        de vehículos.
                    </p>

                </div>


                <button
                    className="btn-primary"
                    onClick={() => {

                        setMostrarFormulario(
                            !mostrarFormulario
                        );

                        setMensaje("");

                        setError("");

                    }}
                >

                    {mostrarFormulario
                        ? "Cancelar"
                        : "+ Registrar vehículo"
                    }

                </button>

            </section>


            {/* =================================
                MENSAJES
            ================================== */}

            {mensaje && (

                <div className="success-message">

                    {mensaje}

                </div>

            )}


            {error && (

                <div className="error-message">

                    {error}

                </div>

            )}


            {/* =================================
                FORMULARIO
            ================================== */}

            {mostrarFormulario && (

                <form
                    className="quotation-form"
                    onSubmit={manejarEnvio}
                >

                    <h2>
                        Registrar vehículo
                    </h2>


                    <div className="form-grid">


                        <div className="form-group">

                            <label>
                                Placa
                            </label>

                            <input
                                type="text"
                                name="placa"
                                value={formulario.placa}
                                onChange={manejarCambio}
                                placeholder="ABC123"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Marca
                            </label>

                            <input
                                type="text"
                                name="marca"
                                value={formulario.marca}
                                onChange={manejarCambio}
                                placeholder="Chevrolet"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Modelo
                            </label>

                            <input
                                type="text"
                                name="modelo"
                                value={formulario.modelo}
                                onChange={manejarCambio}
                                placeholder="NPR"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Año
                            </label>

                            <input
                                type="number"
                                name="anio"
                                value={formulario.anio}
                                onChange={manejarCambio}
                                placeholder="2024"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Color
                            </label>

                            <input
                                type="text"
                                name="color"
                                value={formulario.color}
                                onChange={manejarCambio}
                                placeholder="Blanco"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Tipo
                            </label>

                            <select
                                name="tipo"
                                value={formulario.tipo}
                                onChange={manejarCambio}
                            >

                                <option value="Grúa">
                                    Grúa
                                </option>

                                <option value="Camión">
                                    Camión
                                </option>

                                <option value="Plataforma">
                                    Plataforma
                                </option>

                                <option value="Otro">
                                    Otro
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Capacidad (kg)
                            </label>

                            <input
                                type="number"
                                name="capacidad_kg"
                                value={
                                    formulario.capacidad_kg
                                }
                                onChange={
                                    manejarCambio
                                }
                                placeholder="5000"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Estado
                            </label>

                            <select
                                name="estado"
                                value={formulario.estado}
                                onChange={manejarCambio}
                            >

                                <option value="disponible">
                                    Disponible
                                </option>

                                <option value="en_servicio">
                                    En servicio
                                </option>

                                <option value="en_mantenimiento">
                                    En mantenimiento
                                </option>

                                <option value="inactivo">
                                    Inactivo
                                </option>

                            </select>

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Guardar vehículo
                    </button>

                </form>

            )}


            {/* =================================
                TABLA
            ================================== */}

            {cargando ? (

                <p>
                    Cargando vehículos...
                </p>

            ) : vehiculos.length === 0 ? (

                <div className="service-card">

                    <h3>
                        No hay vehículos registrados
                    </h3>

                    <p>
                        Utiliza el botón
                        "Registrar vehículo"
                        para agregar el primero.
                    </p>

                </div>

            ) : (

                <section
                    className="admin-table-container"
                >

                    <table
                        className="admin-table"
                    >

                        <thead>

                            <tr>

                                <th>
                                    Placa
                                </th>

                                <th>
                                    Marca
                                </th>

                                <th>
                                    Modelo
                                </th>

                                <th>
                                    Año
                                </th>

                                <th>
                                    Tipo
                                </th>

                                <th>
                                    Capacidad
                                </th>

                                <th>
                                    Estado
                                </th>

                                <th>
                                    Acción
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {vehiculos.map(
                                (vehiculo) => (

                                    <tr
                                        key={
                                            vehiculo.id
                                        }
                                    >

                                        <td>
                                            <strong>
                                                {
                                                    vehiculo.placa
                                                }
                                            </strong>
                                        </td>


                                        <td>
                                            {
                                                vehiculo.marca
                                            }
                                        </td>


                                        <td>
                                            {
                                                vehiculo.modelo
                                            }
                                        </td>


                                        <td>
                                            {
                                                vehiculo.anio
                                            }
                                        </td>


                                        <td>
                                            {
                                                vehiculo.tipo
                                            }
                                        </td>


                                        <td>
                                            {
                                                vehiculo.capacidad_kg
                                            } kg
                                        </td>


                                        <td>

                                            {
                                                vehiculo.estado
                                            }

                                        </td>


                                        <td>

                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    manejarEliminar(
                                                        vehiculo.id
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </section>

            )}

        </main>

    );

}


export default AdminVehiculos;