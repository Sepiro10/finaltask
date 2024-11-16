import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import BarraLateral from '../MenuEmpleado/Menuempleado';
import './tareaempleado.css';

const TareaEmpleado = () => {

    const [usuarioId, setusarioId] = useState('');
    const [tareasPorHacer, setTareasPorHacer] = useState([]/*[
        { titulo: 'Diseñar el dashboard de usuarios' },
        { titulo: 'Implementar autenticación segura' },
        { titulo: 'Revisar el sistema de notificaciones' }
    ]*/);

    const [tareasTerminadas, setTareasTerminadas] = useState([] /*[
        { titulo: 'Configurar base de datos' },
        { titulo: 'Implementar login' },
        { titulo: 'Diseñar el sidebar' }
    ]*/);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id || decodedToken.id || decodedToken.userId;

    useEffect(() => {
        const fletchPorHacer = async () => {
            try {
                if (userId) { 

                    const response = await api.taskList(token);
                    const tareasPorUsuarioHacer = response.data.filter(task => task.assigned_to === userId && task.status === 'Pendiente');
                    const tareasPorUsuarioTerminadas = response.data.filter(task => task.assigned_to === userId && task.status === 'Completada');
                    console.log("Tareas del usuario: ", tareasPorUsuarioHacer);
                    console.log("Tareas del usuario 2: ", tareasPorUsuarioTerminadas);
                    console.log("id ", userId);
                    setTareasPorHacer(tareasPorUsuarioHacer);
                    setTareasTerminadas(tareasPorUsuarioTerminadas);
                }
            } catch (error) {
                console.error("Error al listar tareas:", error);
            }
        };

        if (token) {
            fletchPorHacer();  // Llama a fletchTareas solo cuando usuarioId esté disponible
        }
    }, [token]);

    const marcarComoHecho = async (index) => {
        const tarea = tareasPorHacer[index];
        const Earned_points = tarea.points;

        try {

            const response = await api.badgeList(token);
            const badgeAwarded = response.data.find(badge => badge.points_required === Earned_points);

            if (badgeAwarded) {
                console.log("Asignando insignia:", { userId, badgeId: badgeAwarded });
                await api.badgeUBRegister(userId, badgeAwarded, token);
            }
            
            // Realiza la petición al backend para actualizar el estado de la tarea
            await api.taskUpdate(tarea.id, { status: 'Completada' }, token); // Asumimos que tienes esta función en tu servicio de API

            // Si la petición fue exitosa, actualizamos el estado local
            setTareasPorHacer(tareasPorHacer.filter((_, i) => i !== index));
            setTareasTerminadas([...tareasTerminadas, tarea]);

        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    return (
        <div className="contenedorprincipal">
            <BarraLateral />
            <div className="contenedortareas">
                <div className="cuadrotareas">
                    <h2>Tareas por Hacer</h2>
                    <ul className="lista-tareas">
                        {tareasPorHacer.map((tarea, index) => (
                            <li key={index} className="tarea-item">
                                <div className="tarea-info">
                                    <h3 className="tarea-titulo">{tarea.title}</h3>
                                    <p className="tarea-descripcion">{tarea.description}</p>
                                    <p className="tarea-descripcion">Prioridad: {tarea.priority}</p>
                                    <p className="tarea-descripcion">Vence: {tarea.deadline}</p>
                                    <p className="tarea-descripcion">Puntos dados: {tarea.points}</p>
                                </div>
                                <button
                                    className="boton-hecho"
                                    onClick={() => marcarComoHecho(index)}
                                >
                                    Hecho
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="cuadrotareas">
                    <h2>Tareas Terminadas</h2>
                    <ul className="lista-tareas">
                        {tareasTerminadas.map((tarea, index) => (
                            <li key={index} className="tarea-item">
                                <div className="tarea-info">
                                    <h3 className="tarea-titulo">{tarea.title}</h3>
                                    <p className="tarea-descripcion">{tarea.description}</p>
                                    <p className="tarea-descripcion">Prioridad: {tarea.priority}</p>
                                    <p className="tarea-descripcion">Vence: {tarea.deadline}</p>
                                    <p className="tarea-descripcion">Puntos dados: {tarea.points}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TareaEmpleado;
