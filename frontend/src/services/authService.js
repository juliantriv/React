import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";


// ==========================================
// INICIAR SESIÓN
// ==========================================

export const iniciarSesion = async (
    correo,
    password
) => {

    const respuesta = await axios.post(
        `${API_URL}/login`,
        {
            correo,
            password
        }
    );

    return respuesta.data;
};