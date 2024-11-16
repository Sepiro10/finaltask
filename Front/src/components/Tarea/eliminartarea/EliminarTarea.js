import React from 'react';
import './eliminarTarea.css';

const ConfirmacionEliminacion = ({ onEliminar, onCancelar }) => {
    return (
        <div className="ventanaeliminart">
            <div className="contenedoreliminart">
                <h4>¿Estás seguro de que deseas eliminar esta tarea?</h4>
                <div className="botoncontenelim">
                    <button className="botoneliminar si" onClick={onEliminar}>Sí</button>
                    <button className="botoneliminar no" onClick={onCancelar}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionEliminacion;
