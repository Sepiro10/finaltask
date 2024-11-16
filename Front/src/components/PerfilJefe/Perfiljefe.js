import React, { useEffect, useState } from 'react';
import Sidebar from '../Menu_funcion/Menufuncion';
import './perfiljefe.css';
import { jwtDecode } from 'jwt-decode'

const PerfilJefe = () => {

    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [email, setemail] = useState('');
    const [rol, setrol] = useState('');
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
                    setrol(decodedToken.rol)
                    setapellido(decodedToken.apellido);
                    setnombre(decodedToken.nombre);
                    setemail(decodedToken.email);
                    
                } else {
                    console.error("No se pudo obtener el userId del token");
                }
            }
        };

        getIdUser(); // Llama a getIdUser cuando se monte el componente
    }, []);


    return (
        <div className="contenedorperfiljefe">
            <Sidebar />
            <div className="contenidoperfiljefe">
                <div className="perfiljefetarjeta">
                    <div className="perfiljefeheader">
                        <span role="img" aria-label="emoji" className="perfiljefeemoji">
                            👩‍💼
                        </span>
                        <h2>{nombre} {apellido}</h2>
                    </div>
                    <div className="perfiljefeinfo">
                        <p><strong>Nombre:</strong> {nombre}</p>
                        <p><strong>Apellido:</strong> {apellido}</p>
                        <p><strong>Correo:</strong> {email}</p>
                        <p><strong>Rol:</strong> {rol}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilJefe;
