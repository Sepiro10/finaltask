import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Sidebar from '../MenuEmpleado/Menuempleado';
import './perfilempleado.css';

const PerfilEmpleado = () => {

    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [email, setemail] = useState('');
    const [rol, setrol] = useState('');
    const [insignias, setInsignias] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getIdUser = async () => {
            if (token) {
                const decodedToken = jwtDecode(token);
                console.log("decodificacion del token " + decodedToken.user_id || decodedToken.id + decodedToken.data);
                console.log("informacion del token ", decodedToken);
                console.log("rol del token ", decodedToken.rol);
                const userId = decodedToken.user_id || decodedToken.id || decodedToken.userId;
                if (userId) {
                    setrol(decodedToken.rol)
                    setapellido(decodedToken.apellido);
                    setnombre(decodedToken.nombre);
                    setemail(decodedToken.email);

                    try{
                        const response = await api.badgeUBList(token);
                        console.log("insignias: ", response.data);
                        const insigniasFiltradas = response.data.filter(badge => badge.user === userId);
                        setInsignias(insigniasFiltradas);
                        console.log("insignias filtrada: ", insigniasFiltradas);
                    }catch (error){
                       console.error("Error al obtener las insignias:", error);
                    }
                    
                } else {
                    console.error("No se pudo obtener el userId del token");
                }
            }
        };

        getIdUser(); // Llama a getIdUser cuando se monte el componente
    }, []);

    return (
        <div className="contenedorperfil">
            <Sidebar /> 
            <div className="contenidoperfil">
                <div className="perfiltarjeta">
                    <div className="perfilheader">
                        <span role="img" aria-label="emoji" className="perfilemoji">
                            🚀
                        </span>
                        <h2>{nombre} {apellido}</h2>
                    </div>
                    <div className="perfilinfo">
                        <p><strong>Nombre:</strong> {nombre}</p>
                        <p><strong>Apellido:</strong> {apellido}</p>
                        <p><strong>Correo:</strong> {email}</p>
                        <p><strong>Rol:</strong> {rol}</p>
                    </div>
                </div>

                <div className="perfillogros">
                    <h3>Logros Destacados</h3>
                    <ul className="perfillistalogros">
                        {insignias.length > 0 ? (
                            insignias.map((insignia, index) => (
                                <li key={index}>
                                    <strong>{insignia.badge.name}</strong> - {insignia.badge.description}
                                </li>
                            ))
                        ) : (
                            <p>No tienes insignias aún.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PerfilEmpleado;