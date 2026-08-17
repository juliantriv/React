import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/" className="logo">
                    CARTUG'S
                </Link>

                <div className="nav-links">

                    <Link to="/">
                        Inicio
                    </Link>

                    <Link to="/cotizacion">
                        Cotización
                    </Link>

                    <Link to="/login">
                        Inicio de sesión
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;