import React, { useEffect, useState } from 'react';
import Modal from '../../Confirmacion/ConfigMensaje';
import api from '../../../services/api';
import Sidebar from '../../Menu_funcion/Menufuncion';
import EditarInsignia from '../editarinsignia/EditarInsignia';
import ConfirmacionEliminacion from '../eliminarinsignia/EliminarInsignia';
import './listarInsignia.css';

const ListarInsignias = () => {
    const [insignias, setInsignias] = useState([]);
    const [insigniaSeleccionada, setInsigniaSeleccionada] = useState(null);
    const [mensaje, setMensaje] = useState(''); 
    const [mostrarModal, setMostrarModal] = useState(false); 
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [insigniaAEliminar, setInsigniaAEliminar] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() =>{
        const fletchBadges = async () => {
            try {
                if(token){
                    const response = await api.badgeList(token);
                    console.log(response.data);
                    setInsignias(response.data);
                }
            } catch (error){
                console.error("Error al listar insignias:", error);
            }
        };
        fletchBadges();
    }, [token]);

    const handleActualizar = async (insigniaActualizada) => {
        if (token && insigniaActualizada.id){
            try{
                const response = await api.badgekUpdate(insigniaActualizada.id, insigniaActualizada, token);

                setInsignias((prevBadge) =>
                    prevBadge.map((badge) =>
                        badge.id === insigniaActualizada.id ? response.data : badge
                    )
                );
                setMensaje('Insignia actualizada con éxito.');
            } catch (error){
                if (error.response) {
                    console.error("Error en la respuesta del servidor:", error.response.data);
                } else {
                    console.error("Error en la solicitud:", error.message);
                }
                setMensaje('Error al actualizar la tarea.');
            }finally {

                setInsigniaSeleccionada(null);
                setMostrarModal(true);
            }        
        }
    };

    const handleEliminar = async () => {
        if(token){
            try{
                const response = await api.badgeDelete(insigniaAEliminar.id, token)
            
                setInsignias((prevBadge) =>
                    prevBadge.filter((badge) => badge.id !== insigniaAEliminar.id)
                );
            } catch (error) {
                if (error.response) {
                    console.error("Error en la respuesta del servidor:", error.response.data);
                } else {
                    console.error("Error en la solicitud:", error.message);
                }
                setMensaje('Error al actualizar la tarea.');
            }
        }
        setInsignias((prevInsignias) => 
            prevInsignias.filter((insignia) => insignia.id !== insigniaAEliminar.id)
        );
        setMostrarModalEliminar(false);
        setMensaje('Insignia eliminada con éxito.');
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
        <div className="listarinsigniascont">
            <Sidebar />
            <div className="insigniascont">
                {mostrarModal && <Modal mensaje={mensaje} onCerrar={handleCerrarModal} />}
                {mostrarModalEliminar && 
                    <ConfirmacionEliminacion 
                        onEliminar={handleEliminar} 
                        onCancelar={handleCancelarEliminar} 
                    />
                }
                {insigniaSeleccionada ? (
                    <EditarInsignia 
                        insignia={insigniaSeleccionada} 
                        onActualizar={handleActualizar} 
                        onCancelar={() => setInsigniaSeleccionada(null)} 
                    />
                ) : (
                    <>
                        <h3>Lista de Insignias</h3>
                        <table className="insigniastabla">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Puntos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {insignias.map((insignia) => (
                                    <tr key={insignia.id}>
                                        <td>{insignia.name}</td>
                                        <td>{insignia.description}</td>
                                        <td>{insignia.points_required}</td>
                                        <td>
                                            <button 
                                                className="botoneditarli" 
                                                onClick={() => setInsigniaSeleccionada(insignia)}
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button 
                                                className="botoneliminarli" 
                                                onClick={() => { 
                                                    setInsigniaAEliminar(insignia); 
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

export default ListarInsignias;
