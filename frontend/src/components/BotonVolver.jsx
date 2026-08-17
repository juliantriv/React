import { useNavigate } from "react-router-dom";

function BotonVolver() {

    const navigate = useNavigate();

    const regresarAlPanel = () => {

        navigate("/admin");

    };

    return (

        <button
            type="button"
            className="btn-back"
            onClick={regresarAlPanel}
        >
            ← Volver al panel administrativo
        </button>

    );

}

export default BotonVolver;