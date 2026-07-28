import { useState } from "react";
function Formulario() {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [anio, setAnio] = useState("");
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [fecha, setFecha] = useState("");
    const [comentarios, setComentarios] = useState("");

    const manejarEnvio = async (e) => {

    e.preventDefault();

    const datos = {
        nombre,
        email,
        telefono,
        marca,
        modelo,
        anio,
        origen,
        destino,
        fecha,
        comentarios
    };

    try {

        const respuesta = await fetch(
            "http://localhost:3000/cotizaciones",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(datos)
            }
        );

        const resultado = await respuesta.json();

        alert(resultado.mensaje);

    } catch (error) {

        console.error(error);
        alert("Error al conectar con el servidor");

    }

};


        return (
            <form onSubmit={manejarEnvio}>
            <h2>Solicitar cotización</h2>

            <label>Nombre</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Telefono</label>
                <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
            <label>Marca</label>
                <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />
            <label>Modelo</label>
                <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
            <label>Año</label>
                <input type="number" value={anio} onChange={(e) => setAnio(e.target.value)} />
            <label>Origen</label>
                <input type="text" value={origen} onChange={(e) => setOrigen(e.target.value)} required />
            <label>Destino</label>
                <input type="text" value={destino} onChange={(e) => setDestino(e.target.value)} required />
            <label>Fecha</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            <label>Comentarios</label>
                <textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} />

            <button type="submit">Enviar cotización</button>
            </form>
        );
    }

    export default Formulario;