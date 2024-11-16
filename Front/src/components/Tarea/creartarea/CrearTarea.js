import React, { useEffect, useState } from 'react';
import Sidebar from '../../Menu_funcion/Menufuncion';
import api from '../../../services/api'
import './crearTarea.css';
import { jwtDecode } from 'jwt-decode';

const CrearTarea = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [asignarA, setAsignarA] = useState('');
    const [asignadoPor, setAsignadoPor] = useState('');
    const [puntos, setPuntos] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchEmpleados = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await api.userList(token); // Llama a la API para obtener la lista de usuarios
                const empleadosFiltrados = response.data.filter(user => user.rol === 'Empleado'); // Filtrar empleados
                setEmpleados(empleadosFiltrados); // Almacenar empleados en el estado
            } catch (error) {
                console.error("Error al obtener los empleados:", error);
            }
        };

        fetchEmpleados();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Error: no se encontró un token de autenticación.");
            return;
        }

        try {
            const response = await api.taskRegister(
                titulo, 
                descripcion, 
                prioridad, 
                fechaLimite, 
                asignarA, 
                asignadoPor,
                puntos, 
                token
            );

            console.log("Tarea creada:", response.data);
            setIsModalVisible(true); // Mostrar modal de confirmación

        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const getIdUser = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                const userId = decodedToken.user_id; // Asegúrate de que 'id' es el campo correcto
                setAsignadoPor(userId);
            }
        };

        getIdUser(); // Llama a getIdUser cuando se monte el componente
    }, []);

    return (
        <div className="creartareacontainer">
            <Sidebar />
            <div className="vistacreartarea">
                <div className="cajacreartarea">
                    <h3>Crear Tarea</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Título:</label>
                        <input 
                            type="text" 
                            value={titulo} 
                            onChange={(e) => setTitulo(e.target.value)} 
                            required 
                        />
                        <label>Descripción:</label>
                        <input 
                            type="text" 
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                            required 
                        />
                        <label>Prioridad:</label>
                        <select 
                            value={prioridad} 
                            onChange={(e) => setPrioridad(e.target.value)} 
                            required
                        >
                            <option value="">Seleccione</option>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                        <label>Fecha Límite:</label>
                        <input 
                            type="date" 
                            value={fechaLimite} 
                            onChange={(e) => setFechaLimite(e.target.value)} 
                            required 
                        />
                        <label>Asignar A:</label>
                        <select 
                            value={asignarA} 
                            onChange={(e) => setAsignarA(e.target.value)} 
                            required
                        >
                            <option value="">Seleccione un empleado</option>
                            {empleados.map(empleado => (
                                <option key={empleado.id} value={empleado.id}>
                                    {empleado.nombre} {empleado.apellido}
                                </option>
                            ))}
                        </select>
                        <label>Puntos:</label>
                        <input 
                            type="number" 
                            value={puntos} 
                            onChange={(e) => setPuntos(e.target.value)} 
                            required 
                        />
                        <button type="submit">Crear Tarea</button>
                    </form>
                </div>
            </div>

            {isModalVisible && (
                <div className="confirmacion">
                    <div className="contenidocontendor">
                        <span className="salida" onClick={handleCloseModal}>&times;</span>
                        <h4>Tarea creada exitosamente</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearTarea;
