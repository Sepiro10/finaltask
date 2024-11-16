import React from 'react';
import Sidebar from '../MenuEmpleado/Menuempleado'; // Asegúrate de que este archivo esté correctamente importado
import './prinempleado.css';

const PrinEmpleado = () => {
    return (
        <div className="ventanaempleado">
            <Sidebar />
            <div className="textoempleado">
                <div className="contenedorempleado">
                    <h2>¡Bienvenido a TaskBoss!</h2>
                    <p>
                        TaskBoss es la herramienta para gestionar tus tareas y obtener insignias por tu esfuerzo. Aquí podrás:
                    </p>
                    <div className="funcionalidades">
                        <div className="funcion">
                            <h4>Gestionar Mis Tareas</h4>
                            <p>Revisa las tareas asignadas y organiza tu trabajo de manera eficiente.</p>
                        </div>
                        <div className="funcion">
                            <h4>Obtener Insignias</h4>
                            <p>Gana insignias al completar tareas y demostrar tu compromiso.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrinEmpleado;