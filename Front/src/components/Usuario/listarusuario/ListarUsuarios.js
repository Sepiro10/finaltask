import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import Modal from '../../Confirmacion/ConfigMensaje';
import Sidebar from '../../Menu_funcion/Menufuncion';
import EditarUsuario from '../editarusuario/EditarUsuario';
import ConfirmacionEliminacion from '../eliminacionusuario/EliminarUsuario';
import './listarUsuarios.css';

const   ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
    const token = localStorage.getItem('token'); // Asegúrate de tener el token en el localStorage

    useEffect(() => {
        if (token) {
            api.userList(token)
                .then((response) => {
                    console.log(response.data);
                    setUsuarios(response.data); // Asume que la respuesta es un array de usuarios
                })
                .catch((error) => {
                    console.error("Error al listar los usuarios:", error);
                });
        }
    }, [token]);

    const handleActualizar = (usuarioActualizado) => {

        // Clonamos el objeto para no modificar directamente el usuario
        const datosActualizados = { ...usuarioActualizado };

        // Si la contraseña está vacía, la eliminamos de los datos que se enviarán
        if (!datosActualizados.contrasena) {
            delete datosActualizados.contrasena;
        }

        if (token && usuarioActualizado.id) {
            api.userUpdate(usuarioActualizado.id, datosActualizados, token) // Llamada a la API
                .then((response) => {
                    setUsuarios((prevUsuarios) =>
                        prevUsuarios.map((usuario) =>
                            usuario.id === usuarioActualizado.id ? response.data : usuario // Actualiza el estado con la respuesta de la API
                        )
                    );
                    setMensaje('Usuario actualizado con éxito.');
                    setUsuarioSeleccionado(null);
                    setMostrarModal(true);
                })
                .catch((error) => {
                    if (error.response) {
                        console.error("Error en la respuesta del servidor:", error.response.data);
                    } else {
                        console.error("Error en la solicitud:", error.message);
                    }
                    setMensaje('Error al actualizar el usuario.');
                    setMostrarModal(true);
                });
        }
        setUsuarioSeleccionado(null); 
        setMostrarModal(true);
    };
    

    const handleEliminar = () => {
        if (token && usuarioAEliminar) {
            api.userDelete(usuarioAEliminar.id, token) // Llamada a la API para eliminar el usuario
                .then(() => {
                    setUsuarios((prevUsuarios) =>
                        prevUsuarios.filter((usuario) => usuario.id !== usuarioAEliminar.id) // Elimina el usuario del estado
                    );
                    setMostrarModalEliminar(false);
                    setMensaje('Usuario eliminado con éxito.');
                    setMostrarModal(true);
                })
                .catch((error) => {
                    console.error("Error al eliminar el usuario:", error);
                    setMensaje('Error al eliminar el usuario.');
                    setMostrarModal(true);
                });
        }
        setMostrarModalEliminar(false);
        setMensaje('Usuario eliminado con éxito.'); 
        setMostrarModal(true);
    };

    const handleEliminarUsuario = (usuario) => {
        setUsuarioAEliminar(usuario);
        setMostrarModalEliminar(true);
    };

    const handleCancelarEliminar = () => {
        setMostrarModalEliminar(false);

    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
        setMensaje('');
    }

    return (
        <div className="listarusuariocont">
            <Sidebar />
            <div className="usuariocont">
                {mostrarModal && <Modal mensaje={mensaje} onCerrar={handleCerrarModal} />}
                {mostrarModalEliminar && 
                    <ConfirmacionEliminacion 
                        onEliminar={handleEliminar} 
                        onCancelar={handleCancelarEliminar} 
                    />
                } 
                {usuarioSeleccionado ? (
                    <EditarUsuario 
                        usuario={usuarioSeleccionado} 
                        onActualizar={handleActualizar} 
                        onCancelar={() => setUsuarioSeleccionado(null)} 
                    />
                ) : (
                    <>
                        <h3>Lista de Usuarios</h3>
                        <table className="usuariotabla">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Correo</th>
                                    <th>Rol</th> 
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario, index) => (
                                    <tr key={index}>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.rol}</td> 
                                        <td>
                                            <button 
                                                className="botoneditar" 
                                                onClick={() => setUsuarioSeleccionado(usuario)} 
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button 
                                                className="botoneliminar" 
                                                onClick={() => handleEliminarUsuario(usuario)}
                                            >
                                                🗑️ Borrar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default ListarUsuarios;
