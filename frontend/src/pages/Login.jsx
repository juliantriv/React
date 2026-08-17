import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { iniciarSesion } from "../services/authService";


function Login() {

    const navigate = useNavigate();


    const [correo, setCorreo] =
        useState("");

    const [password, setPassword] =
        useState("");


    const [error, setError] =
        useState("");


    const [cargando, setCargando] =
        useState(false);


    // =========================================
    // ENVIAR LOGIN
    // =========================================

    const manejarLogin = async (e) => {

        e.preventDefault();

        setError("");

        setCargando(true);


        try {

            const respuesta =
                await iniciarSesion(
                    correo,
                    password
                );


            // Guardar token

            localStorage.setItem(
                "token",
                respuesta.token
            );


            // Guardar usuario

            localStorage.setItem(
                "usuario",
                JSON.stringify(
                    respuesta.usuario
                )
            );


            // Ir al panel

            navigate("/admin");


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
                    "No fue posible conectarse con el servidor"
                );

            }

        } finally {

            setCargando(false);

        }

    };


    return (

        <main className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <span className="hero-tag">
                        CARTUG'S
                    </span>

                    <h1>
                        Iniciar sesión
                    </h1>

                    <p>
                        Acceso al sistema administrativo
                    </p>

                </div>


                {error && (

                    <div className="error-message">
                        {error}
                    </div>

                )}


                <form onSubmit={manejarLogin}>

                    <div className="form-group">

                        <label>
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={correo}
                            onChange={(e) =>
                                setCorreo(e.target.value)
                            }
                            placeholder="correo@cartugs.com"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Contraseña
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Ingrese su contraseña"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn-primary form-button"
                        disabled={cargando}
                    >

                        {cargando
                            ? "Ingresando..."
                            : "Iniciar sesión"
                        }

                    </button>

                </form>

            </div>

        </main>

    );

}

export default Login;