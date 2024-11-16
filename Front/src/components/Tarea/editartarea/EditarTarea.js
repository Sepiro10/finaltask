import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import './editarTarea.css';

const EditarTarea = ({ tarea, onActualizar, onCancelar }) => {
    const [titulo, setTitulo] = useState(tarea.titulo || '');
    const [NombreAsignado, setNombreAsignado] = useState('Cargando...');
    const [descripcion, setDescripcion] = useState(tarea.descripcion || '');
    const [prioridad, setPrioridad] = useState(tarea.prioridad || 'Baja');
    const [fechaLimite, setFechaLimite] = useState(tarea.fechaLimite || '');
    const [responsable, setResponsable] = useState(tarea.responsable || '');
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        console.log(tarea.assigned_to);
        
            const nombreUsuarioAsignado = async () => {
                try {
                    const response = await api.userList(token);
                    const usuarioAsignado = response.data.find(user => user.user_id || user.id === tarea.assigned_to);
                    if (usuarioAsignado) {
                        setNombreAsignado(`${usuarioAsignado.nombre} ${usuarioAsignado.apellido}`);
                    } else {
                        setNombreAsignado("Usuario no encontrado");
                    }
                } catch (error) {
                    setNombreAsignado("Error al cargar usuario");
                    console.error("Error al encontrar el nombre de la persona asignada:", error);
                }
            };
            nombreUsuarioAsignado();
        
    }, [token, tarea.assigned_to]);

    useEffect(() => {
        if (tarea) {
            setTitulo(tarea.title || '');
            setDescripcion(tarea.description || '');
            setPrioridad(tarea.priority || 'Baja');
            setFechaLimite(tarea.deadline || '');
            setResponsable(NombreAsignado || '');
        }
    }, [tarea]); // El useEffect se dispara cuando la tarea cambia

    const handleActualizar = (e) => {
        e.preventDefault();
        onActualizar({ 
            ...tarea,
            title: titulo, 
            description: descripcion, 
            priority: prioridad, 
            deadline: fechaLimite, 
            //assigned_to: responsable 
        });
        setMensaje('Tarea actualizada con éxito.');
        setTimeout(() => {
            setMensaje('');
        }, 3000);
    };

    return (
        <div className="editartareacont">
            <h3>Editar Tarea</h3>
            {mensaje && <p className="mensajeconfirmaciont">{mensaje}</p>}
            <form>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Prioridad:</label>
                    <select
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                        required
                    >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
                <div>
                    <label>Fecha Límite:</label>
                    <input
                        type="date"
                        value={fechaLimite}
                        onChange={(e) => setFechaLimite(e.target.value)}
                        required
                    />
                </div>

                <div className="botoncontt">
                    <button type="button" className="editar" onClick={handleActualizar}>
                        Actualizar
                    </button>
                    <button type="button" className="cancelar" onClick={onCancelar}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarTarea;
