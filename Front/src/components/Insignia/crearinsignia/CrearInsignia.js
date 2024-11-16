import React, { useState } from 'react';
import api from '../../../services/api';
import Sidebar from '../../Menu_funcion/Menufuncion';
import './crearInsignia.css';

const CrearInsignia = () => {
    const [name, setNombre] = useState('');
    const [description, setDescripcion] = useState('');
    const [points_required, setPuntos] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if(token){

            try {
                const response = await api.badgeRegister(
                    name, 
                    description, 
                    points_required,
                    token
                );
                console.log("tarea creada: " + response.data);
                setIsModalVisible(true);
        
            } catch (error) {
                console.log('error al crear insignia ' + error)
            } 
        }else{
            console.log("Error: no se encontró un token de autenticación.");
            return;
        }
        
        /*setNombre('');
        setDescripcion('');
        setPuntos('');*/
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="crearinsigniacontainer">
            <Sidebar />
            <div className="vistacrearinsignia">
                <div className="cajacrearinsignia">
                    <h3>Crear Insignia</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required 
                        />
                        <label>Descripción:</label>
                        <input 
                            type="text" 
                            value={description} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                            required 
                        />
                        <label>Puntos:</label>
                        <input 
                            type="number" 
                            value={points_required} 
                            onChange={(e) => setPuntos(e.target.value)} 
                            required 
                        />
                        <button type="submit">Crear Insignia</button>
                    </form>
                </div>
            </div>

            {isModalVisible && (
                <div className="confirmacion">
                    <div className="contenidocontenedor">
                        <span className="salida" onClick={handleCloseModal}>&times;</span>
                        <h4>Insignia creada exitosamente</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearInsignia;
