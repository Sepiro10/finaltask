import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Menu_funcion/Menufuncion';
import './encuesta.css';

const Encuestas = () => {
    const navigate = useNavigate();

    return (
        <div className="ventanaencuestas">
            <Sidebar />
            <div className="contenedorencuestas">
                <div className="cajaencuestas">
                    <h3>Gestión de Encuestas</h3>
                    <p>En esta sección podrás gestionar las encuestas del sistema.</p>
                    <div className="botonencuestas">
                        <button className="botoncrear" onClick={() => navigate('/crear-encuesta')}>
                            Crear Encuesta
                        </button>
                        <button className="botonlistar" onClick={() => navigate('/listar-encuesta')}>
                            Listar Encuestas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Encuestas;