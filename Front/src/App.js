import { jwtDecode } from 'jwt-decode'; // Asegúrate de importar jwt-decode
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NoPermissionModal from './components/Confirmacion/nopermiso'; // Importa el modal de advertencia
import EncuestaEmpleado from './components/EncuestaEmpleado/EncuestaEmpleado';
import CrearEncuesta from './components/EncuestaJefe/CrearEncuesta/CrearEncuesta';
import Encuestas from './components/EncuestaJefe/EncuestaPrin/Encuesta';
import ListarEncuestas from './components/EncuestaJefe/ListarEncuesta/ListarEncuesta';
import CrearInsignia from './components/Insignia/crearinsignia/CrearInsignia';
import ListarInsignias from './components/Insignia/listarinsignia/ListarInsignia';
import Insignias from './components/Insignia/principal/Insignia';
import InsigniaEmpleado from './components/InsigniaEmpleado/Insigniaempleado';
import Login from './components/Logeo/Login';
import Logo from './components/Logo/Logo';
import PerfilEmpleado from './components/PerfilEmpleado/perfilempleado';
import PerfilJefe from './components/PerfilJefe/Perfiljefe';
import PrinEmpleado from './components/Prin_Empleado/prinempleado';
import PrinJefe from './components/Prin_jefe/prinjefe';
import Progreso from './components/Progreso/Progreso';
import CrearTarea from './components/Tarea/creartarea/CrearTarea';
import ListarTareas from './components/Tarea/listartarea/ListarTarea';
import Tareas from './components/Tarea/principaltarea/Tarea';
import TareaEmpleado from './components/TareaEmpleado/tareaEmpleado';
import CrearUsuario from './components/Usuario/crearusuario/CrearUsuario';
import ListarUsuario from './components/Usuario/listarusuario/ListarUsuarios';
import Usuario from './components/Usuario/principal/Usuario';

const App = () => {
    const [userRole, setUserRole] = useState(null);  
    const [showModal, setShowModal] = useState(false);  

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);  
            setUserRole(decodedToken.rol);  
        } else {
            setUserRole(null);
        }
    }, []);


    const closeModal = () => {
        setShowModal(false);
        setUserRole(null); 
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <Router>
            <Logo />
            <Routes>
              
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                

                <Route
                    path="/prinjefe"
                    element={userRole === 'Jefe' ? <PrinJefe /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/usuarios"
                    element={userRole === 'Jefe' ? <Usuario /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/crear-usuario"
                    element={userRole === 'Jefe' ? <CrearUsuario /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/listar-usuario"
                    element={userRole === 'Jefe' ? <ListarUsuario /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/tareas"
                    element={userRole === 'Jefe' ? <Tareas /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/crear-tarea"
                    element={userRole === 'Jefe' ? <CrearTarea /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/listar-tarea"
                    element={userRole === 'Jefe' ? <ListarTareas /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/insignias"
                    element={userRole === 'Jefe' ? <Insignias /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/crear-insignia"
                    element={userRole === 'Jefe' ? <CrearInsignia /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/listar-insignias"
                    element={userRole === 'Jefe' ? <ListarInsignias /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/progreso"
                    element={userRole === 'Jefe' ? <Progreso /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/perfiljefe"
                    element={userRole === 'Jefe' ? <PerfilJefe /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/prinempleado"
                    element={userRole === 'Empleado' ? <PrinEmpleado /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/perfilempleado"
                    element={userRole === 'Empleado' ? <PerfilEmpleado /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/insigniaempleado"
                    element={userRole === 'Empleado' ? <InsigniaEmpleado /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/tareaempleado"
                    element={userRole === 'Empleado' ? <TareaEmpleado /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/encuestajefe"
                    element={userRole === 'Jefe' ? <Encuestas /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/crear-encuesta"
                    element={userRole === 'Jefe' ? <CrearEncuesta /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/listar-encuestas"
                    element={userRole === 'Jefe' ? <ListarEncuestas /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
                <Route
                    path="/encuestaempleado"
                    element={userRole === 'Empleado' ? <EncuestaEmpleado /> : <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
                />
            </Routes>

            {/* Mostrar el modal de advertencia si no tiene permisos */}
            {showModal && <NoPermissionModal message="No tienes permisos para acceder a esta página." onClose={closeModal} />}
        </Router>
    );
};

export default App;
