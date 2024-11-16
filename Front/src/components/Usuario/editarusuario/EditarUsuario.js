import React, { useState } from 'react';
import api from '../../../services/api'
import './editarUsuario.css';

const EditarUsuario = ({ usuario, onActualizar, onCancelar }) => {
    const [nombre, setNombre] = useState(usuario.nombre || '');
    const [apellido, setApellido] = useState(usuario.apellido || '');
    const [email, setCorreo] = useState(usuario.email || '');
    const [rol, setRol] = useState(usuario.rol || 'Empleado');
    const [mensaje, setMensaje] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        onActualizar({
            ...usuario,
            nombre,
            apellido,
            email,
            rol
        });
    };

    return (
        <div className="editarusuariocontenedor">
            <h3 style={{ textAlign: 'center' }}>Editar Usuario</h3>
            {mensaje && <p className="mensajeconfirmacion">{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </div>
                <div>
                    <label>Correo:</label>
                    <input type="email" value={email} onChange={(e) => setCorreo(e.target.value)} required />
                </div>
                <div>
                    <label>Rol:</label>
                    <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                        <option value="Empleado">Empleado</option>
                        <option value="Jefe">Jefe</option>
                    </select>
                </div>
                <div className="contenedorboton">
                    <button type="submit">Actualizar</button>
                    <button type="button" onClick={onCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditarUsuario;
