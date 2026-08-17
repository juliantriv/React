import { useEffect, useState } from "react";
import BotonVolver from "../components/BotonVolver";
import {
    obtenerEmpleados,
    crearEmpleado,
    eliminarEmpleado
} from "../services/empleadoService";


function AdminEmpleados() {

    const formularioInicial = {

        documento: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        cargo: "",
        salario_base: "",
        fecha_ingreso: "",
        estado: "activo"

    };


    const [empleados, setEmpleados] =
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
    // CARGAR EMPLEADOS
    // =========================================

    const cargarEmpleados = async () => {

        try {

            setCargando(true);

            const datos =
                await obtenerEmpleados();

            setEmpleados(datos);

            setError("");

        } catch (error) {

            console.error(error);

            setError(
                "No fue posible cargar los empleados"
            );

        } finally {

            setCargando(false);

        }

    };


    useEffect(() => {

        cargarEmpleados();

    }, []);


    // =========================================
    // CAMBIAR FORMULARIO
    // =========================================

    const manejarCambio = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormulario({

            ...formulario,

            [name]: value

        });

    };


    // =========================================
    // CREAR EMPLEADO
    // =========================================

    const manejarEnvio = async (e) => {

        e.preventDefault();

        setMensaje("");
        setError("");


        try {

            await crearEmpleado(
                formulario
            );


            setMensaje(
                "Empleado registrado correctamente"
            );


            setFormulario(
                formularioInicial
            );


            setMostrarFormulario(false);


            await cargarEmpleados();


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
                    "No fue posible registrar el empleado"
                );

            }

        }

    };


    // =========================================
    // ELIMINAR
    // =========================================

    const manejarEliminar = async (id) => {

        const confirmar =
            window.confirm(
                "¿Seguro que deseas eliminar este empleado?"
            );


        if (!confirmar) {
            return;
        }


        try {

            await eliminarEmpleado(id);


            setMensaje(
                "Empleado eliminado correctamente"
            );


            await cargarEmpleados();


        } catch (error) {

            console.error(error);

            setError(
                "No fue posible eliminar el empleado"
            );

        }

    };


    return (

        <main className="page-container">

            <BotonVolver />


            {/* ENCABEZADO */}

            <section className="admin-header">

                <div>

                    <span className="hero-tag">
                        CARTUG'S
                    </span>

                    <h1>
                        Empleados
                    </h1>

                    <p>
                        Administración del personal
                        de Cartug's.
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
                        : "+ Registrar empleado"
                    }

                </button>

            </section>


            {/* MENSAJES */}

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


            {/* FORMULARIO */}

            {mostrarFormulario && (

                <form
                    className="quotation-form"
                    onSubmit={manejarEnvio}
                >

                    <h2>
                        Registrar empleado
                    </h2>


                    <div className="form-grid">


                        <div className="form-group">

                            <label>
                                Documento
                            </label>

                            <input
                                type="text"
                                name="documento"
                                value={
                                    formulario.documento
                                }
                                onChange={
                                    manejarCambio
                                }
                                placeholder="1234567890"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Nombre
                            </label>

                            <input
                                type="text"
                                name="nombre"
                                value={
                                    formulario.nombre
                                }
                                onChange={
                                    manejarCambio
                                }
                                placeholder="Juan"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Apellido
                            </label>

                            <input
                                type="text"
                                name="apellido"
                                value={
                                    formulario.apellido
                                }
                                onChange={
                                    manejarCambio
                                }
                                placeholder="Pérez"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Teléfono
                            </label>

                            <input
                                type="tel"
                                name="telefono"
                                value={
                                    formulario.telefono
                                }
                                onChange={
                                    manejarCambio
                                }
                                placeholder="3001234567"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Correo
                            </label>

                            <input
                                type="email"
                                name="correo"
                                value={
                                    formulario.correo
                                }
                                onChange={
                                    manejarCambio
                                }
                                placeholder="empleado@email.com"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Cargo
                            </label>

                            <input
                                type="text"
                                name="cargo"
                                value={
                                    formulario.cargo
                                }
                                onChange={
                                    manejarCambio
                                }
                                placeholder="Conductor"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Salario base
                            </label>

                            <input
                                type="number"
                                name="salario_base"
                                value={
                                    formulario.salario_base
                                }
                                onChange={
                                    manejarCambio
                                }
                                placeholder="1500000"
                                min="0"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Fecha de ingreso
                            </label>

                            <input
                                type="date"
                                name="fecha_ingreso"
                                value={
                                    formulario.fecha_ingreso
                                }
                                onChange={
                                    manejarCambio
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Estado
                            </label>

                            <select
                                name="estado"
                                value={
                                    formulario.estado
                                }
                                onChange={
                                    manejarCambio
                                }
                            >

                                <option value="activo">
                                    Activo
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
                        Guardar empleado
                    </button>

                </form>

            )}


            {/* TABLA */}

            {cargando ? (

                <p>
                    Cargando empleados...
                </p>

            ) : empleados.length === 0 ? (

                <div className="service-card">

                    <h3>
                        No hay empleados registrados
                    </h3>

                    <p>
                        Utiliza el botón
                        "Registrar empleado"
                        para agregar el primero.
                    </p>

                </div>

            ) : (

                <section
                    className="admin-table-container"
                >

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>
                                    Documento
                                </th>

                                <th>
                                    Empleado
                                </th>

                                <th>
                                    Contacto
                                </th>

                                <th>
                                    Cargo
                                </th>

                                <th>
                                    Salario
                                </th>

                                <th>
                                    Ingreso
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

                            {empleados.map(
                                (empleado) => (

                                    <tr
                                        key={
                                            empleado.id
                                        }
                                    >

                                        <td>
                                            {
                                                empleado.documento
                                            }
                                        </td>


                                        <td>

                                            <strong>

                                                {
                                                    empleado.nombre
                                                }

                                                {" "}

                                                {
                                                    empleado.apellido
                                                }

                                            </strong>

                                        </td>


                                        <td>

                                            {
                                                empleado.telefono
                                            }

                                            <br />

                                            <small>
                                                {
                                                    empleado.correo
                                                }
                                            </small>

                                        </td>


                                        <td>
                                            {
                                                empleado.cargo
                                            }
                                        </td>


                                        <td>
                                            $
                                            {
                                                Number(
                                                    empleado.salario_base
                                                ).toLocaleString(
                                                    "es-CO"
                                                )
                                            }
                                        </td>


                                        <td>
                                            {
                                                empleado.fecha_ingreso
                                            }
                                        </td>


                                        <td>
                                            {
                                                empleado.estado
                                            }
                                        </td>


                                        <td>

                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    manejarEliminar(
                                                        empleado.id
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


export default AdminEmpleados;