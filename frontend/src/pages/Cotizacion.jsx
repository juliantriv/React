import { useState } from "react";

import { crearCotizacion } from "../services/cotizacionService";


function Cotizacion() {

    const [formulario, setFormulario] = useState({

        nombre_cliente: "",
        correo_cliente: "",
        telefono_cliente: "",

        marca_vehiculo: "",
        modelo_vehiculo: "",
        anio_vehiculo: "",

        origen: "",
        destino: "",

        fecha_servicio: "",

        comentarios: ""

    });


    const [mensaje, setMensaje] = useState("");

    const [error, setError] = useState("");


    // =========================================
    // ACTUALIZAR CAMPOS
    // =========================================

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setFormulario({

            ...formulario,

            [name]: value

        });

    };


    // =========================================
    // ENVIAR FORMULARIO
    // =========================================

    const manejarEnvio = async (e) => {

        e.preventDefault();

        setMensaje("");
        setError("");


        try {

            await crearCotizacion(formulario);


            setMensaje(
                "¡Cotización enviada correctamente!"
            );


            // Limpiar formulario

            setFormulario({

                nombre_cliente: "",
                correo_cliente: "",
                telefono_cliente: "",

                marca_vehiculo: "",
                modelo_vehiculo: "",
                anio_vehiculo: "",

                origen: "",
                destino: "",

                fecha_servicio: "",

                comentarios: ""

            });


        } catch (error) {

            console.error(error);

            setError(
                "No fue posible enviar la cotización. Intenta nuevamente."
            );

        }

    };


    return (

        <main className="page-container">

            <section className="form-header">

                <span className="hero-tag">
                    CARTUG'S
                </span>

                <h1>
                    Solicita tu cotización
                </h1>

                <p>
                    Completa la información y nuestro equipo
                    podrá revisar tu solicitud.
                </p>

            </section>


            <form
                className="quotation-form"
                onSubmit={manejarEnvio}
            >

                {/* =====================================
                    MENSAJES
                ====================================== */}

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


                {/* =====================================
                    CLIENTE
                ====================================== */}

                <h2>
                    Información del cliente
                </h2>


                <div className="form-grid">

                    <div className="form-group">

                        <label>
                            Nombre completo
                        </label>

                        <input
                            type="text"
                            name="nombre_cliente"
                            value={formulario.nombre_cliente}
                            onChange={manejarCambio}
                            placeholder="Ingrese su nombre"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            name="correo_cliente"
                            value={formulario.correo_cliente}
                            onChange={manejarCambio}
                            placeholder="correo@ejemplo.com"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Teléfono
                        </label>

                        <input
                            type="tel"
                            name="telefono_cliente"
                            value={formulario.telefono_cliente}
                            onChange={manejarCambio}
                            placeholder="3001234567"
                            required
                        />

                    </div>

                </div>


                {/* =====================================
                    VEHÍCULO
                ====================================== */}

                <h2>
                    Información del vehículo
                </h2>


                <div className="form-grid">

                    <div className="form-group">

                        <label>
                            Marca
                        </label>

                        <input
                            type="text"
                            name="marca_vehiculo"
                            value={formulario.marca_vehiculo}
                            onChange={manejarCambio}
                            placeholder="Ej. Toyota"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Modelo
                        </label>

                        <input
                            type="text"
                            name="modelo_vehiculo"
                            value={formulario.modelo_vehiculo}
                            onChange={manejarCambio}
                            placeholder="Ej. Fortuner"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Año
                        </label>

                        <input
                            type="number"
                            name="anio_vehiculo"
                            value={formulario.anio_vehiculo}
                            onChange={manejarCambio}
                            placeholder="2024"
                        />

                    </div>

                </div>


                {/* =====================================
                    TRASLADO
                ====================================== */}

                <h2>
                    Información del traslado
                </h2>


                <div className="form-grid">

                    <div className="form-group">

                        <label>
                            Lugar de origen
                        </label>

                        <input
                            type="text"
                            name="origen"
                            value={formulario.origen}
                            onChange={manejarCambio}
                            placeholder="Ciudad de origen"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Lugar de destino
                        </label>

                        <input
                            type="text"
                            name="destino"
                            value={formulario.destino}
                            onChange={manejarCambio}
                            placeholder="Ciudad de destino"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Fecha del servicio
                        </label>

                        <input
                            type="date"
                            name="fecha_servicio"
                            value={formulario.fecha_servicio}
                            onChange={manejarCambio}
                            required
                        />

                    </div>

                </div>


                {/* =====================================
                    COMENTARIOS
                ====================================== */}

                <div className="form-group">

                    <label>
                        Comentarios
                    </label>

                    <textarea
                        name="comentarios"
                        value={formulario.comentarios}
                        onChange={manejarCambio}
                        rows="5"
                        placeholder="Información adicional..."
                    />

                </div>


                <button
                    type="submit"
                    className="btn-primary form-button"
                >
                    Solicitar cotización
                </button>

            </form>

        </main>

    );

}

export default Cotizacion;