import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Menu_funcion/Menufuncion';
import './tarea.css';

const Tareas = () => {
    const navigate = useNavigate();
    
    return (
        <div className="ventanatareas">
            <Sidebar />
            <div className="contenedortareas">
                <div className="cajatareas">
                    <h3>Gestión de Tareas</h3>
                    <p>En esta sección podrás gestionar las tareas del sistema.</p>
                    <div className="botonusuario">
                        <button className="botoncrear" onClick={() => navigate('/crear-tarea')}>
                            Crear Tarea
                        </button>
                        <button className="botonlistar" onClick={() => navigate('/listar-tarea')} >
                            Listar Tareas
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Tareas;
