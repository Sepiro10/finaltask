import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Menu_funcion/Menufuncion';
import './insignia.css';

const Insignias = () => {
    const navigate = useNavigate();

    return (
        <div className="ventanainsignias">
            <Sidebar />
            <div className="contenedorinsignias">
                <div className="cajainsignias">
                    <h3>Gestión de Insignias</h3>
                    <p>En esta sección podrás gestionar las insignias del sistema.</p>
                    <div className="botoninsignias">
                        <button className="botoncrear" onClick={() => navigate('/crear-insignia')}>
                            Crear Insignia
                        </button>
                        <button className="botonlistar" onClick={() => navigate('/listar-insignias')}>
                            Listar Insignias
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insignias;
