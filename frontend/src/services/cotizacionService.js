import axios from "axios";

const API_URL = "http://localhost:3000/api/cotizaciones";

// Crear una cotización
export const crearCotizacion = async (datos) => {

    const respuesta = await axios.post(
        API_URL,
        datos
    );

    return respuesta.data;
};