import React from 'react';
import './eliminarInsignia.css';

const ConfirmacionEliminacion = ({ onEliminar, onCancelar }) => {
    return (
        <div className="campoeliminarins">
            <div className="contenedoreliminarins">
                <h4>¿Estás seguro de que deseas eliminar esta insignia?</h4>
                <div className="button-container">
                    <button className="botoneliminarins si" onClick={onEliminar}>Sí</button>
                    <button className="botoneliminarins no" onClick={onCancelar}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionEliminacion;
