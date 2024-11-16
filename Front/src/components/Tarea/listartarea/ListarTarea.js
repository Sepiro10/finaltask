import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import api from "../../../services/api";
import Modal from '../../Confirmacion/ConfigMensaje';
import Sidebar from '../../Menu_funcion/Menufuncion';
import EditarTarea from '../editartarea/EditarTarea';
import ConfirmacionEliminacion from '../eliminartarea/EliminarTarea';
import './listarTarea.css';

const ListarTareas = () => {
    const [tareas, setTareas] = useState([]);
    const [usuarioId, setusarioId] = useState('');
    const [nombreAsignado, setNombreAsignado] = useState('');
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [tareaAEliminar, setTareaAEliminar] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getIdUser = () => {
            if (token) {
                const decodedToken = jwtDecode(token);
                console.log("decodificacion del token " + decodedToken.user_id || decodedToken.id + decodedToken.data);
                console.log("informacion del token ", decodedToken);
                console.log("rol del token ", decodedToken.rol);
                const userId = decodedToken.user_id || decodedToken.id || decodedToken.userId;
                if (userId) {
                    setusarioId(userId);
                } else {
                    console.error("No se pudo obtener el userId del token");
                }
            }
        };

        getIdUser(); // Llama a getIdUser cuando se monte el componente
    }, []);

    useEffect(() => {
        const fletchTareas = async () => {
            try {
                if (usuarioId) {  // Solo busca tareas si el userId está disponible
                    const response = await api.taskList(token);
                    const tareasPorUsuarioAsignado = response.data.filter(task => task.assigned_by === usuarioId);
                    console.log("Tareas del usuario:", tareasPorUsuarioAsignado);
                    console.log("id ", usuarioId);
                    setTareas(tareasPorUsuarioAsignado);
                }
            } catch (error) {
                console.error("Error al listar tareas:", error);
            }
        };

        if (usuarioId) {
            fletchTareas();  // Llama a fletchTareas solo cuando usuarioId esté disponible
        }
    }, [token, usuarioId]);

    useEffect(() => {
        const nombreUsuarioAsignado = async () => {
            try{
                const response = await api.userList(token);
                const usuarioAsignado = response.data.find(user => user.user_id === tareas.assigned_to);
                if (usuarioAsignado) {
                    setNombreAsignado(`${usuarioAsignado.nombre} ${usuarioAsignado.apellido}`);
                } else {
                    console.error("No se encontró el usuario asignado.");
                }
            }catch (error){
                console.error("Error al encontrar el nombre de la persona asignada:", error);
            }
        }

        nombreUsuarioAsignado();
    }, [token, tareas.assigned_to]);

    const handleActualizar = async (tareaActualizada) => {
        if(token && tareaActualizada.id){
            try{
                const response = await api.taskUpdate(tareaActualizada.id, tareaActualizada, token);

                setTareas((prevTarea) => 
                    prevTarea.map((tarea) =>
                        tarea.id === tareaActualizada.id ? response.data : tarea
                    )
                );
                setMensaje('Tarea actualizada con éxito.');
            } catch (error) {
                if (error.response) {
                    console.error("Error en la respuesta del servidor:", error.response.data);
                } else {
                    console.error("Error en la solicitud:", error.message);
                }
                setMensaje('Error al actualizar la tarea.');
            }finally {
                // Asegurarse de que el modal se cierre y la selección de tarea se limpie
                setTareaSeleccionada(null);
                setMostrarModal(true);
            }
        }
    };

    const handleEliminar = async () => {
        if(token){
            try{
                const response = await api.taskDelete(tareaAEliminar.id, token)

                setTareas((prevTareas) =>
                    prevTareas.filter((tarea) => tarea.id !== tareaAEliminar.id)
                );
                setMensaje('Tarea actualizada con éxito.');
            } catch (error){
                if (error.response) {
                    console.error("Error en la respuesta del servidor:", error.response.data);
                } else {
                    console.error("Error en la solicitud:", error.message);
                }
                setMensaje('Error al actualizar la tarea.');
            }
           
        }
        
        setMostrarModalEliminar(false);
        setMensaje('Tarea eliminada con éxito.');
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
        setMensaje('');
    };

    const handleCancelarEliminar = () => {
        setMostrarModalEliminar(false);
    };
    
    return (
        <div className="listar-tareas-container">
            <Sidebar />
            <div className="tareas-content">
                {mostrarModal && <Modal mensaje={mensaje} onCerrar={handleCerrarModal} />}
                {mostrarModalEliminar && (
                    <ConfirmacionEliminacion
                        onEliminar={handleEliminar}
                        onCancelar={handleCancelarEliminar}
                    />
                )}
                {tareaSeleccionada ? (
                    <EditarTarea
                        tarea={tareaSeleccionada}
                        onActualizar={handleActualizar}
                        onCancelar={() => setTareaSeleccionada(null)}
                    />
                ) : (
                    <>
                        <h3>Lista de Tareas</h3>
                        <table className="tareas-table">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Prioridad</th>
                                    <th>Fecha Límite</th>
                                    <th>Responsable</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tareas.map((tarea, index) => (
                                    <tr key={index}>
                                        <td>{tarea.title}</td>
                                        <td>{tarea.description}</td>
                                        <td>{tarea.priority}</td>
                                        <td>{tarea.deadline}</td>
                                        <td>{nombreAsignado}</td>
                                        <td>
                                            <button
                                                className="edit-button"
                                                onClick={() => setTareaSeleccionada(tarea)}
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => {
                                                    setTareaAEliminar(tarea);
                                                    setMostrarModalEliminar(true);
                                                }}
                                            >
                                                🗑️ Borrar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default ListarTareas;
