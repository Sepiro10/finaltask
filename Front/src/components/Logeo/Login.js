import { jwtDecode } from 'jwt-decode'; // Importación corregida para decodificar el token
import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import authService from "../../services/api";
import './login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Maneja el cambio en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Maneja el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login(formData.email, formData.password)
            .then(response => {
                console.log("Respuesta de la API:", response.data);
                
                if (response.data && response.data.access) {
                    // Almacenar el token JWT en localStorage
                    localStorage.setItem('token', response.data.access);
                    localStorage.setItem('refresh', response.data.refresh);

                    // Decodificar el token para obtener el rol del usuario
                    const decodedToken = jwtDecode(response.data.access);
                    const userRole = decodedToken.rol;

                    // Redirigir según el rol del usuario
                    if (userRole === 'Empleado') {
                        navigate('/prinempleado'); // Redirige a la ruta del empleado
                    } else if (userRole === 'Jefe') {
                        navigate('/prinjefe'); // Redirige a la ruta del jefe
                    } else {
                        setMessage('Rol desconocido. Redirigiendo a inicio...');
                        setTimeout(() => {
                            navigate('/');
                        }, 2000);
                    }
                } else {
                    setMessage("Error: Token no encontrado en la respuesta.");
                }
            })
            .catch(error => {
                console.log("Error:", error);
                setMessage("Error al iniciar sesión: " + (error.response?.data?.detail || "Error desconocido"));
            });
    };
    
    return (
        <div className="paginalogeo">
            <div className="contenedorlogeo">
                <form onSubmit={handleSubmit}>
                    <h2 className="iniciarsesion">Iniciar Sesión</h2>
                    <div className="logeorecuadro">
                        <FaUser className="icono" />
                        <input 
                            type="text" 
                            className="campotexto" 
                            placeholder="Usuario" 
                            onChange={handleChange} 
                            name='email' 
                            value={formData.email} 
                            required 
                        />
                    </div>
                    <div className="logeorecuadro">
                        <FaLock className="icono" />
                        <input 
                            type="password" 
                            className="campotexto" 
                            placeholder="Contraseña" 
                            onChange={handleChange} 
                            name='password' 
                            value={formData.password} 
                            required 
                        />
                    </div>
                    <button className="botonlogeo">Entrar</button>
                    {message && <p>{message}</p>} {/* Mensaje de error si algo falla */}
                </form>
            </div>
            <div className="informacionrecuadro">
                <h1 className="tituloinfo">Bienvenido a TaskBoss</h1>
                <p className="descripcioninfo">
                    TaskBoss es una plataforma diseñada para ayudarte a gestionar tus tareas de manera eficiente.
                    Simplifica tu trabajo y aumenta tu productividad. ¡Descubre todo lo que podemos ofrecerte!
                </p>
            </div>
        </div>
    );
};

export default Login;
