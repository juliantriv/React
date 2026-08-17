import axios from "axios";


const API_URL =
    "http://localhost:3000/api/cotizaciones";


// ==========================================
// OBTENER COTIZACIONES
// ==========================================

export const obtenerCotizaciones = async () => {

    const token =
        localStorage.getItem("token");


    const respuesta = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );


    return respuesta.data;
};


// ==========================================
// CAMBIAR ESTADO
// ==========================================

export const cambiarEstadoCotizacion = async (
    id,
    estado_id
) => {

    const token =
        localStorage.getItem("token");


    const respuesta = await axios.put(

        `${API_URL}/${id}/estado`,

        {
            estado_id
        },

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );


    return respuesta.data;
};