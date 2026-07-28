function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Cartug's</div>

      <ul className="menu">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Cotización</a></li>
        <li><a href="#">Nosotros</a></li>
        <li><a href="#" className="btn-login">Inicio de Sesión</a></li>
      </ul>

    </nav>
  );
}

export default Navbar;