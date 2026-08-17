import axios from "axios";


const API_URL =
    "http://localhost:3000/api/nominas";


// ==========================================
// OBTENER NÓMINAS
// ==========================================

export const obtenerNominas = async () => {

    const token =
        localStorage.getItem("token");


    const respuesta =
        await axios.get(

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
// CREAR NÓMINA
// ==========================================

export const crearNomina = async (
    nomina
) => {

    const token =
        localStorage.getItem("token");


    const respuesta =
        await axios.post(

            API_URL,

            nomina,

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
// CAMBIAR ESTADO
// ==========================================

export const cambiarEstadoNomina =
    async (
        id,
        estado
    ) => {

        const token =
            localStorage.getItem("token");


        const respuesta =
            await axios.put(

                `${API_URL}/${id}/estado`,

                {
                    estado
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


        return respuesta.data;

    };