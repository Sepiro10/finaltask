import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Menu_funcion/Menufuncion';
import './usuario.css';
const Usuario = () => {
    const navigate = useNavigate(); 

    return (
        <div className="ventanausuario">
            <Sidebar />
            <div className="contenedorusuario">
                <div className="cajausuario">
                    <h3>Gestión de Usuarios</h3>
                    <p>En esta sección podrás gestionar los usuarios del sistema.</p>
                    <div className="botonusuario">
                        <button className="botoncrear" onClick={() => navigate('/crear-usuario')}>
                            Crear Usuario
                        </button>
                        <button className="botonlistar" onClick={() => navigate('/listar-usuario')}>
                            Listar Usuarios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Usuario;
