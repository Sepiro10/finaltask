import React from 'react';
import Sidebar from '../Menu_funcion/Menufuncion';
import './prinjefe.css';


const PrinJefe = () => {
    return (
        
        <div className="ventanajefe">
            <Sidebar />
            <div className="textojefe">
                <div className="contenedorjefe">
                    <h2>¡Bienvenido a TaskBoss!</h2>
                    <p>
                        TaskBoss es tu asistente de productividad. Aquí puedes gestionar tareas, asignarlas a tu equipo, 
                        monitorear el progreso, y motivar a tus empleados con un sistema de insignias.
                    </p>
                    <div className="funcionalidades">
                        <div className="funcion">
                            
                            <h4>Gestión de Tareas</h4>
                            <p>Asignar y organizar tareas para tu equipo de forma eficiente.</p>
                        </div>
                        <div className="funcion">
                           
                            <h4>Monitoreo de Progreso</h4>
                            <p>Visualiza el progreso semanal.</p>
                        </div>
                        <div className="funcion">
                            
                            <h4>Sistema de Insignias</h4>
                            <p>Reconoce el esfuerzo de tu equipo con insignias y motivación.</p>
                        </div>
                        <div className="funcion">
                           
                            <h4>Gestión de Usuarios</h4>
                            <p>Controla el acceso y gestiona los roles de cada usuario en la plataforma.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrinJefe;
