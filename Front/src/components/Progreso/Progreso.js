
import React, { useState } from 'react';
import MenuFuncion from '../Menu_funcion/Menufuncion';
import './progreso.css';

const Progreso = () => {

    const tareas = {
        total: 10,
        completadas: 6,
        enProgreso: 2,
        pendientes: 2,
        tareasCompletadas: ['Tarea 1', 'Tarea 2', 'Tarea 3', 'Tarea 4', 'Tarea 5', 'Tarea 6'],
        tareasEnProgreso: ['Tarea 7', 'Tarea 8'],
        tareasPendientes: ['Tarea 9', 'Tarea 10', ],
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [tareasLista, setTareasLista] = useState([]);

    const abrirModal = (tipoTareas) => {
        setTareasLista(tipoTareas);
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
        setTareasLista([]);
    };

    return (
        <div className="listarinsigniascont">
            <MenuFuncion />

            <div className="insigniascont">
                <h2>Resumen General de Tareas</h2>
                <div className="tarjetascont">
                    <div className="tarjeta totaltareas">
                        <h3>Total de Tareas</h3>
                        <p>{tareas.total}</p>
                    </div>
                </div>
                <div className="tarjetascont">
                    <div className="tarjeta" onClick={() => abrirModal(tareas.tareasCompletadas)}>
                        <h3>Tareas Completadas</h3>
                        <p>{tareas.completadas}</p>
                        <button className='botonprogreso'>Ver Tareas</button>
                    </div>
                    <div className="tarjeta" onClick={() => abrirModal(tareas.tareasEnProgreso)}>
                        <h3>Tareas en Progreso</h3>
                        <p>{tareas.enProgreso}</p>
                        <button className='botonprogreso'>Ver Tareas</button>
                    </div>
                    <div className="tarjeta" onClick={() => abrirModal(tareas.tareasPendientes)}>
                        <h3>Tareas Pendientes</h3>
                        <p>{tareas.pendientes}</p>
                        <button className='botonprogreso'>Ver Tareas</button>
                    </div>
                </div>

                {modalOpen && (
                    <div className="ventana">
                        <div className="contenedorvent">
                            <span className="cerrar" onClick={cerrarModal}>&times;</span>
                            <h3>Tareas</h3>
                            <ul>
                                {tareasLista.map((tarea, index) => (
                                    <li key={index}>{tarea}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Progreso;
