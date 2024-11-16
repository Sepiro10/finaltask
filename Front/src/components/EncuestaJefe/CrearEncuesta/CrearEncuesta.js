import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Menu_funcion/Menufuncion';
import './crearEncuesta.css';

const CrearEncuesta = () => {
    const [nombre, setNombre] = useState('');
    const [enlace, setEnlace] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Encuesta creada:', { nombre, enlace });
        setIsModalVisible(true);
        setNombre('');
        setEnlace('');
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        navigate('/listar-encuesta'); 
    };

    return (
        <div className="crearencuestacontainer">
            <Sidebar />
            <div className="vistacrearencuesta">
                <div className="cajacrearencuesta">
                    <h3>Crear Encuesta</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre de la encuesta:</label>
                        <input 
                            type="text" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required 
                        />
                        <label>Enlace de la encuesta:</label>
                        <input 
                            type="url" 
                            value={enlace} 
                            onChange={(e) => setEnlace(e.target.value)} 
                            required 
                        />
                        <button type="submit">Crear Encuesta</button>
                    </form>
                </div>
            </div>

            {isModalVisible && (
                <div className="confirmacion">
                    <div className="contenidocontendor">
                        <span className="salida" onClick={handleCloseModal}>&times;</span>
                        <h4>Encuesta creada exitosamente</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearEncuesta;