import React from 'react';
import Sidebar from '../MenuEmpleado/Menuempleado';
import './insigniaempleado.css';

const InsigniaEmpleado = () => {
    const puntosActuales = 120; 
    const emojiMedalla = '🏅'; 

    const insigniasGanadas = [
        { nombre: 'Insignia 1' },
        { nombre: 'Insignia 2' }
    ];

    const insigniasDisponibles = [
        { nombre: 'Insignia 3', puntosNecesarios: 150 },
        { nombre: 'Insignia 4', puntosNecesarios: 200 }
    ];

    return (
        <div className="contenedorprincipal">
            <Sidebar />
            <div className="contenedorinsignias">
                <div className="puntosactuales">
                    <p>Tus puntos actuales:</p>
                    <div className="puntos">{puntosActuales}</div>
                </div>

                <div className="seccioninsignias">
                    <div className="insigniasganadas">
                        <h2>Insignias Ganadas</h2>
                        <div className="listainsignias">
                            {insigniasGanadas.map((insignia, index) => (
                                <div key={index} className="insignia">
                                    <span className="emojimedalla">{emojiMedalla}</span>
                                    <p>{insignia.nombre}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="insigniasdisponibles">
                        <h2>Insignias Disponibles</h2>
                        <div className="listainsignias">
                            {insigniasDisponibles.map((insignia, index) => (
                                <div key={index} className="insignia">
                                    <span className="emojimedalla">{emojiMedalla}</span> 
                                    <p>{insignia.nombre}</p>
                                    <p className="puntosnecesarios">{insignia.puntosNecesarios} puntos</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsigniaEmpleado;
