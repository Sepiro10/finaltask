// Modal.js
import React from 'react';
import './configmensaje.css';

const Modal = ({ mensaje, onCerrar }) => {
    return (
        <div className="campoconfig">
            <div className="contenedorconfig">
                <h3>Confirmación</h3>
                <p>{mensaje}</p>
                <div className="contbotonconf">
                    <button className="botonconfi" onClick={onCerrar}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
