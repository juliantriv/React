import axios from "axios";


const API_URL =
    "http://localhost:3000/api/vehiculos";


// ==========================================
// OBTENER VEHÍCULOS
// ==========================================

export const obtenerVehiculos = async () => {

    const token =
        localStorage.getItem("token");


    const respuesta = await axios.get(
        API_URL,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );


    return respuesta.data;

};


// ==========================================
// CREAR VEHÍCULO
// ==========================================

export const crearVehiculo = async (
    vehiculo
) => {

    const token =
        localStorage.getItem("token");


    const respuesta = await axios.post(

        API_URL,

        vehiculo,

        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }

    );


    return respuesta.data;

};


// ==========================================
// ACTUALIZAR VEHÍCULO
// ==========================================

export const actualizarVehiculo = async (
    id,
    vehiculo
) => {

    const token =
        localStorage.getItem("token");


    const respuesta = await axios.put(

        `${API_URL}/${id}`,

        vehiculo,

        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }

    );


    return respuesta.data;

};


// ==========================================
// ELIMINAR VEHÍCULO
// ==========================================

export const eliminarVehiculo = async (
    id
) => {

    const token =
        localStorage.getItem("token");


    const respuesta = await axios.delete(

        `${API_URL}/${id}`,

        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }

    );


    return respuesta.data;

};