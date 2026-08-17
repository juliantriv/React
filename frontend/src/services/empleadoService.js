import axios from "axios";


const API_URL =
    "http://localhost:3000/api/empleados";


// ==========================================
// OBTENER EMPLEADOS
// ==========================================

export const obtenerEmpleados = async () => {

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
// CREAR EMPLEADO
// ==========================================

export const crearEmpleado = async (
    empleado
) => {

    const token =
        localStorage.getItem("token");


    const respuesta = await axios.post(

        API_URL,

        empleado,

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
// ACTUALIZAR EMPLEADO
// ==========================================

export const actualizarEmpleado = async (
    id,
    empleado
) => {

    const token =
        localStorage.getItem("token");


    const respuesta = await axios.put(

        `${API_URL}/${id}`,

        empleado,

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
// ELIMINAR EMPLEADO
// ==========================================

export const eliminarEmpleado = async (
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