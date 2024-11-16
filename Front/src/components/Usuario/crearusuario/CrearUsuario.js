import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../../services/api";
import Sidebar from '../../Menu_funcion/Menufuncion';
import './crearUsuario.css';

const Resgister = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            setMessage("Error: no se encontró un token de autenticación.");
            return;
        }

        console.log("Token found:", token); // For debugging purposes        

        api.register(formData.nombre, formData.apellido, formData.email, formData.password, formData.rol, token)
            .then(response => {
                console.log("Registro exitoso:", response.data);
                setMessage("Registro exitoso");
                navigate('/crear-usuario');  // Redirigir a la página de login después de registrarse
            })
            .catch(error => {
                console.log("Error en el registro:", error);
                setMessage("Error al registrarse: " + (error.response?.data?.detail || "Error desconocido"));
            });
    };

    return (
        <div className="crearusuariocontainer">
            <Sidebar />
            <div className="vistacrearusuario">
                <div className="cajacrearusuario">
                    <h3>Crear Usuario</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre:</label>
                        <input 
                            type="text"
                            name='nombre'
                            onChange={handleChange} 
                            required 
                        />
                        <label>Apellido:</label>
                        <input 
                            type="text" 
                            name="apellido"
                            onChange={handleChange} 
                            required 
                        />
                        <label>Correo:</label>
                        <input 
                            type='email'
                            name= 'email'
                            onChange={handleChange} 
                            required 
                        />
                        <label>Contraseña:</label>
                        <input 
                            type="password" 
                            name = 'password'
                            onChange={handleChange} 
                            required 
                        />
                        <label>Rol:</label>
                        <select 
                            name = 'rol'
                            onChange={handleChange} 
                            required
                        >
                            <option value="Empleado">Empleado</option>
                            <option value="Jefe">Jefe</option>
                        </select>
                        <button type="submit">Crear Usuario</button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Resgister;
