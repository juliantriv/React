import { Link, useNavigate } from "react-router-dom";


function Admin() {

    const navigate = useNavigate();


    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );


    const cerrarSesion = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("usuario");

        navigate("/login");

    };


    return (

        <main className="page-container">

            <section className="admin-header">

                <div>

                    <span className="hero-tag">
                        CARTUG'S
                    </span>

                    <h1>
                        Panel administrativo
                    </h1>

                    <p>
                        Bienvenido, {usuario?.nombre}
                    </p>

                </div>


                <button
                    className="logout-button"
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </button>

            </section>


            <section className="admin-grid">


                {/* =================================
                    COTIZACIONES
                ================================== */}

                <Link
                    to="/admin/cotizaciones"
                    className="admin-card"
                >

                    <div className="admin-card-icon">
                        📋
                    </div>

                    <h2>
                        Cotizaciones
                    </h2>

                    <p>
                        Revisar las solicitudes
                        de los clientes y administrar
                        su estado.
                    </p>

                    <span>
                        Administrar →
                    </span>

                </Link>


                {/* =================================
                    VEHÍCULOS
                ================================== */}

                <Link
                    to="/admin/vehiculos"
                    className="admin-card"
                >

                    <div className="admin-card-icon">
                        🚚
                    </div>

                    <h2>
                        Vehículos
                    </h2>

                    <p>
                        Registrar y administrar
                        los vehículos de Cartug's.
                    </p>

                    <span>
                        Administrar →
                    </span>

                </Link>


                {/* =================================
                    EMPLEADOS
                ================================== */}

                <Link
                    to="/admin/empleados"
                    className="admin-card"
                >

                    <div className="admin-card-icon">
                        👥
                    </div>

                    <h2>
                        Empleados
                    </h2>

                    <p>
                        Gestionar la información
                        de los empleados.
                    </p>

                    <span>
                        Administrar →
                    </span>

                </Link>


                {/* =================================
                    NÓMINA
                ================================== */}

                <Link
                    to="/admin/nomina"
                    className="admin-card"
                >

                    <div className="admin-card-icon">
                        💰
                    </div>

                    <h2>
                        Nómina
                    </h2>

                    <p>
                        Administrar salarios,
                        pagos e historial de nómina.
                    </p>

                    <span>
                        Administrar →
                    </span>

                </Link>


            </section>

        </main>

    );

}


export default Admin;