import React, { useState } from 'react';
import Modal from '../../Confirmacion/ConfigMensaje';
import Sidebar from '../../Menu_funcion/Menufuncion';
import ConfirmacionEliminacion from '../../Tarea/eliminartarea/EliminarTarea';
import './listarEncuesta.css';

const ListarEncuestas = () => {
    const [encuestas, setEncuestas] = useState([
        { nombre: 'Encuesta 1', enlace: 'https://enlace1.com' },
        { nombre: 'Encuesta 2', enlace: 'https://enlace2.com' },
        { nombre: 'Encuesta 3', enlace: 'https://enlace3.com' }
    ]);

    const [mensaje, setMensaje] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [encuestaAEliminar, setEncuestaAEliminar] = useState(null);

    const handleEliminar = () => {
        setEncuestas((prevEncuestas) =>
            prevEncuestas.filter((encuesta) => encuesta.nombre !== encuestaAEliminar.nombre)
        );
        setMostrarModalEliminar(false);
        setMensaje('Encuesta eliminada con éxito.');
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
        <div className="listar-encuestas-container">
            <Sidebar />
            <div className="encuestas-content">
                {mostrarModal && <Modal mensaje={mensaje} onCerrar={handleCerrarModal} />}
                {mostrarModalEliminar && (
                    <ConfirmacionEliminacion
                        onEliminar={handleEliminar}
                        onCancelar={handleCancelarEliminar}
                    />
                )}
                <h3>Lista de Encuestas</h3>
                <table className="encuestas-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Enlace</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encuestas.map((encuesta, index) => (
                            <tr key={index}>
                                <td>{encuesta.nombre}</td>
                                <td>
                                    <a href={encuesta.enlace} target="_blank" rel="noopener noreferrer">
                                        {encuesta.enlace}
                                    </a>
                                </td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            setEncuestaAEliminar(encuesta);
                                            setMostrarModalEliminar(true);
                                        }}
                                    >
                                        🗑 Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListarEncuestas;