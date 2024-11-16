import React from 'react';
import { useNavigate } from 'react-router-dom';
import './nopermiso.css'; // Asegúrate de importar el archivo CSS

const NoPermissionModal = ({ message }) => {
    const navigate = useNavigate();  // Hook para navegar

    const handleClose = () => {
        navigate('/login');  // Redirige al login al cerrar el modal
    };

    return (
        <div className="overlay">
            <div className="modal-content">
                <h2 className="modal-title">Acceso Denegado</h2>
                <p>{message}</p>
                <button onClick={handleClose} className="close-button">Cerrar</button>
            </div>
        </div>
    );
};

export default NoPermissionModal;
