import { useEffect, useState } from "react";
import BotonVolver from "../components/BotonVolver";
import {
    obtenerNominas,
    crearNomina,
    cambiarEstadoNomina
} from "../services/nominaService";

import {
    obtenerEmpleados
} from "../services/empleadoService";


function AdminNomina() {

    const formularioInicial = {

        empleado_id: "",
        periodo: "",
        salario_base: "",
        bonificaciones: 0,
        deducciones: 0

    };


    const [nominas, setNominas] =
        useState([]);


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
    // CARGAR DATOS
    // =========================================

    const cargarDatos = async () => {

        try {

            setCargando(true);


            const [
                datosNominas,
                datosEmpleados
            ] = await Promise.all([

                obtenerNominas(),

                obtenerEmpleados()

            ]);


            setNominas(
                datosNominas
            );


            setEmpleados(
                datosEmpleados.filter(
                    empleado =>
                        empleado.estado ===
                        "activo"
                )
            );


            setError("");


        } catch (error) {

            console.error(error);

            setError(
                "No fue posible cargar la información"
            );

        } finally {

            setCargando(false);

        }

    };


    useEffect(() => {

        cargarDatos();

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


        // Si cambia empleado,
        // obtener salario automáticamente

        if (
            name === "empleado_id"
        ) {

            const empleado =
                empleados.find(

                    item =>
                        item.id ===
                        Number(value)

                );


            if (empleado) {

                setFormulario(

                    anterior => ({

                        ...anterior,

                        empleado_id: value,

                        salario_base:
                            empleado.salario_base

                    })

                );

            }

        }

    };


    // =========================================
    // CREAR NÓMINA
    // =========================================

    const manejarEnvio = async (e) => {

        e.preventDefault();


        setMensaje("");
        setError("");


        try {

            const respuesta =
                await crearNomina(
                    formulario
                );


            setMensaje(

                `Nómina creada correctamente. ` +
                `Salario neto: $${Number(
                    respuesta.salario_neto
                ).toLocaleString("es-CO")}`

            );


            setFormulario(
                formularioInicial
            );


            setMostrarFormulario(
                false
            );


            await cargarDatos();


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
                    "No fue posible crear la nómina"
                );

            }

        }

    };


    // =========================================
    // CAMBIAR ESTADO
    // =========================================

    const actualizarEstado = async (
        id,
        estado
    ) => {

        try {

            await cambiarEstadoNomina(
                id,
                estado
            );


            setMensaje(
                "Estado actualizado correctamente"
            );


            await cargarDatos();


        } catch (error) {

            console.error(error);

            setError(
                "No fue posible actualizar el estado"
            );

        }

    };


    // =========================================
    // SALARIO NETO PREVISUALIZADO
    // =========================================

    const salarioNeto =

        Number(
            formulario.salario_base || 0
        )

        +

        Number(
            formulario.bonificaciones || 0
        )

        -

        Number(
            formulario.deducciones || 0
        );


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
                        Nómina
                    </h1>

                    <p>
                        Administración de salarios
                        y pagos del personal.
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
                        : "+ Crear nómina"
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
                        Crear nómina
                    </h2>


                    <div className="form-grid">


                        {/* EMPLEADO */}

                        <div className="form-group">

                            <label>
                                Empleado
                            </label>

                            <select
                                name="empleado_id"
                                value={
                                    formulario.empleado_id
                                }
                                onChange={
                                    manejarCambio
                                }
                                required
                            >

                                <option value="">
                                    Seleccionar empleado
                                </option>


                                {empleados.map(
                                    empleado => (

                                        <option
                                            key={
                                                empleado.id
                                            }
                                            value={
                                                empleado.id
                                            }
                                        >

                                            {
                                                empleado.nombre
                                            }

                                            {" "}

                                            {
                                                empleado.apellido
                                            }

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* PERÍODO */}

                        <div className="form-group">

                            <label>
                                Período
                            </label>

                            <input
                                type="month"
                                name="periodo"
                                value={
                                    formulario.periodo
                                }
                                onChange={
                                    manejarCambio
                                }
                                required
                            />

                        </div>


                        {/* SALARIO */}

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
                                min="0"
                                required
                            />

                        </div>


                        {/* BONIFICACIONES */}

                        <div className="form-group">

                            <label>
                                Bonificaciones
                            </label>

                            <input
                                type="number"
                                name="bonificaciones"
                                value={
                                    formulario.bonificaciones
                                }
                                onChange={
                                    manejarCambio
                                }
                                min="0"
                            />

                        </div>


                        {/* DEDUCCIONES */}

                        <div className="form-group">

                            <label>
                                Deducciones
                            </label>

                            <input
                                type="number"
                                name="deducciones"
                                value={
                                    formulario.deducciones
                                }
                                onChange={
                                    manejarCambio
                                }
                                min="0"
                            />

                        </div>


                        {/* NETO */}

                        <div className="form-group">

                            <label>
                                Salario neto
                            </label>

                            <input
                                type="text"
                                value={

                                    `$${salarioNeto
                                        .toLocaleString(
                                            "es-CO"
                                        )}`

                                }
                                readOnly
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Crear nómina
                    </button>

                </form>

            )}


            {/* TABLA */}

            {cargando ? (

                <p>
                    Cargando nóminas...
                </p>

            ) : nominas.length === 0 ? (

                <div className="service-card">

                    <h3>
                        No hay nóminas registradas
                    </h3>

                    <p>
                        Crea la primera nómina
                        utilizando el botón superior.
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
                                    Empleado
                                </th>

                                <th>
                                    Período
                                </th>

                                <th>
                                    Salario base
                                </th>

                                <th>
                                    Bonificaciones
                                </th>

                                <th>
                                    Deducciones
                                </th>

                                <th>
                                    Neto
                                </th>

                                <th>
                                    Estado
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {nominas.map(
                                nomina => (

                                    <tr
                                        key={
                                            nomina.id
                                        }
                                    >

                                        <td>

                                            <strong>

                                                {
                                                    nomina.nombre
                                                }

                                                {" "}

                                                {
                                                    nomina.apellido
                                                }

                                            </strong>

                                            <br />

                                            <small>

                                                {
                                                    nomina.cargo
                                                }

                                            </small>

                                        </td>


                                        <td>
                                            {
                                                nomina.periodo
                                            }
                                        </td>


                                        <td>

                                            $
                                            {
                                                Number(
                                                    nomina.salario_base
                                                ).toLocaleString(
                                                    "es-CO"
                                                )
                                            }

                                        </td>


                                        <td>

                                            $
                                            {
                                                Number(
                                                    nomina.bonificaciones
                                                ).toLocaleString(
                                                    "es-CO"
                                                )
                                            }

                                        </td>


                                        <td>

                                            $
                                            {
                                                Number(
                                                    nomina.deducciones
                                                ).toLocaleString(
                                                    "es-CO"
                                                )
                                            }

                                        </td>


                                        <td>

                                            <strong>

                                                $
                                                {
                                                    Number(
                                                        nomina.salario_neto
                                                    ).toLocaleString(
                                                        "es-CO"
                                                    )
                                                }

                                            </strong>

                                        </td>


                                        <td>

                                            <select

                                                value={
                                                    nomina.estado
                                                }

                                                onChange={

                                                    e =>
                                                        actualizarEstado(
                                                            nomina.id,
                                                            e.target.value
                                                        )

                                                }

                                            >

                                                <option value="pendiente">
                                                    Pendiente
                                                </option>

                                                <option value="pagada">
                                                    Pagada
                                                </option>

                                                <option value="cancelada">
                                                    Cancelada
                                                </option>

                                            </select>

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


export default AdminNomina;