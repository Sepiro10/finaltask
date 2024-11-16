import React from 'react';
import './eliminarUsuario.css';

const ConfirmacionEliminacion = ({ onEliminar, onCancelar }) => {
    return (
        <div className="campoeliminar">
            <div className="contenedoreliminar">
                <h4>¿Estás seguro de que deseas eliminar este usuario?</h4>
                <div className="contbotonel">
                    <button className="botonelim si" onClick={onEliminar}>Sí</button>
                    <button className="botonelim no" onClick={onCancelar}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionEliminacion;
