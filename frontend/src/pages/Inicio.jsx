import { Link } from "react-router-dom";

function Inicio() {
    return (
        <main className="inicio">

            <section className="hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        TRANSPORTE DE VEHÍCULOS
                    </span>

                    <h1>
                        El servicio de grúa que
                        <span> te da tranquilidad</span>
                    </h1>

                    <p>
                        En Cartug's conectamos tus traslados con puntualidad y rastreo en tiempo real. Protegemos tu inversión en cada kilómetro.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/cotizacion"
                            className="btn-primary"
                        >
                            Solicitar cotización
                        </Link>

                        <Link
                            to="/login"
                            className="btn-secondary"
                        >
                            Acceso administrativo
                        </Link>

                    </div>

                </div>

            </section>


            <section className="services">

                <h2>
                    Nuestros servicios
                </h2>

                <p className="section-description">
                    Soluciones para el transporte seguro de vehículos.
                </p>


                <div className="services-grid">

                    <article className="service-card">

                        <div className="service-icon">
                            🚚
                        </div>

                        <h3>
                            Transporte de vehículos
                        </h3>

                        <p>
                            Trasladamos vehículos de manera
                            segura hacia el destino solicitado.
                        </p>

                    </article>


                    <article className="service-card">

                        <div className="service-icon">
                            🛡️
                        </div>

                        <h3>
                            Seguridad
                        </h3>

                        <p>
                            Trabajamos para garantizar un
                            servicio confiable durante el traslado.
                        </p>

                    </article>


                    <article className="service-card">

                        <div className="service-icon">
                            📋
                        </div>

                        <h3>
                            Cotizaciones
                        </h3>

                        <p>
                            Solicita una cotización de manera
                            rápida y sencilla desde nuestra plataforma.
                        </p>

                    </article>

                </div>

            </section>

        </main>
    );
}

export default Inicio;