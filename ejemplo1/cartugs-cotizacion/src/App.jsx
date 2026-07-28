import Formulario from './components/Formulario';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <h1 className="titulo">CARTUG'S</h1>
      <Formulario />
      <Footer />
    </div>
  );
}

export default App;