import { Routes, Route } from "react-router-dom";
import AdminEmpleados from "../pages/AdminEmpleados";
import Inicio from "../pages/Inicio";
import Cotizacion from "../pages/Cotizacion";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import AdminCotizaciones from "../pages/AdminCotizaciones";
import AdminVehiculos from "../pages/AdminVehiculos";
import ProtectedRoute from "./ProtectedRoute";
import AdminNomina from "../pages/AdminNomina";


function AppRoutes() {

    return (

        <Routes>

            {/* =====================================
                PÁGINAS PÚBLICAS
            ====================================== */}

            <Route
                path="/"
                element={<Inicio />}
            />

            <Route
                path="/cotizacion"
                element={<Cotizacion />}
            />

            <Route
                path="/login"
                element={<Login />}
            />


            {/* =====================================
                PANEL ADMINISTRATIVO
            ====================================== */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/vehiculos"
                element={
                    <ProtectedRoute>
                        <AdminVehiculos />
                    </ProtectedRoute>
                }
            />  

            <Route
                path="/admin/empleados"
                element={
                    <ProtectedRoute>
                        <AdminEmpleados />
                    </ProtectedRoute>
                }
            />
            
            <Route
                path="/admin/nomina"
                element={
                    <ProtectedRoute>
                        <AdminNomina />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                COTIZACIONES
            ====================================== */}

            <Route
                path="/admin/cotizaciones"
                element={
                    <ProtectedRoute>
                        <AdminCotizaciones />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRoutes;