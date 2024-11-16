import React, { useEffect,useState } from 'react';
import api from '../../../services/api';
import './editarInsignia.css';

const EditarInsignia = ({ insignia, onActualizar, onCancelar }) => {
    const [name, setNombre] = useState(insignia.nombre || '');
    const [description, setDescripcion] = useState(insignia.descripcion || '');
    const [points_required, setPuntos] = useState(insignia.puntos || '');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (insignia) {
            setNombre(insignia.name || '');
            setDescripcion(insignia.description || '');
            setPuntos(insignia.points_required || 0);
        }
    }, [insignia]);

    const handleActualizar = (e) => {
        e.preventDefault();
        onActualizar({ 
            ...insignia,
            name, 
            description, 
            points_required 
        });
        setMensaje('Insignia actualizada con éxito.');
        setTimeout(() => {
            setMensaje('');
        }, 3000);
    };

    return (
        <div className="editarinsigniacontainer">
            <h3 style={{ textAlign: 'center' }}>Editar Insignia</h3>
            {mensaje && <p className="mensaje-confirmacion">{mensaje}</p>}
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input type="text" value={description} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                <div>
                    <label>Puntos:</label>
                    <input type="number" value={points_required} onChange={(e) => setPuntos(e.target.value)} required />
                </div>
                <div className="botoneditcontenedor">
                    <button type="button" className="botonactu" onClick={handleActualizar}>Actualizar</button>
                    <button type="button" className="botoncance" onClick={onCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditarInsignia;
