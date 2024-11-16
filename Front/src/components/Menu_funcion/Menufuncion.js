import React, { useState } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './menufuncion.css';

const BarraLateral = () => {
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const navegar = useNavigate();

    const manejarToggleMenu = () => {
        setMostrarMenu(!mostrarMenu);
    };

    const manejarCerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
    };

    return (
        <div className="contenedorbarralateral">
            <div className="encabezadodashboard">
                {!mostrarMenu && (
                    <div className="iconomenu" onClick={manejarToggleMenu}>
                        <FaBars />
                    </div>
                )}
            </div>
            {mostrarMenu && (
                <div className="barralateral">
                    <div className="iconovolver" onClick={manejarToggleMenu}>
                        <FaArrowLeft />
                    </div>
                    <ul>
                        <li><button onClick={() => navegar('/usuarios')}>Usuarios</button></li>
                        <li><button onClick={() => navegar('/tareas')}>Tareas</button></li>
                        <li><button onClick={() => navegar('/insignias')}>Insignias</button></li>
                        <li><button onClick={() => navegar('/progreso')}>Progreso</button></li>
                        <li><button onClick={() => navegar('/perfiljefe')}>Perfil</button></li>
                        <li><button onClick={() => navegar('/encuestajefe')}>Encuestas</button></li>
                    </ul>
                    <div className="contenedorcerrarsesion">
                        <button className="botoncerrarsesion" onClick={manejarCerrarSesion}>Cerrar Sesión</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BarraLateral;
