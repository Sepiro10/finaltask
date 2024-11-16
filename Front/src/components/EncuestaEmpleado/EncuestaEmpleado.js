import React, { useState } from 'react';
import BarraLateral from '../MenuEmpleado/Menuempleado';
import './encuestaempleado.css';

const EncuestaEmpleado = () => {
    const [encuestasPorHacer, setEncuestasPorHacer] = useState([
        { titulo: 'Encuesta de satisfacción del usuario' },
        { titulo: 'Encuesta sobre el rendimiento del sistema' },
        { titulo: 'Encuesta de feedback del proyecto' }
    ]);

    const [encuestasTerminadas, setEncuestasTerminadas] = useState([
        { titulo: 'Encuesta de necesidades de capacitación' },
        { titulo: 'Encuesta de satisfacción laboral' }
    ]);

    const marcarComoHecho = (index) => {
        const encuesta = encuestasPorHacer[index];
        setEncuestasPorHacer(encuestasPorHacer.filter((_, i) => i !== index));
        setEncuestasTerminadas([...encuestasTerminadas, encuesta]);
    };

    return (
        <div className="contenedorprincipal">
            <BarraLateral />
            <div className="contenedorencuestas">
                <div className="cuadroencuestas">
                    <h2>Encuestas por Realizar</h2>
                    <ul className="listaencuestas">
                        {encuestasPorHacer.map((encuesta, index) => (
                            <li key={index}>
                                {encuesta.titulo}
                                <button
                                    className="botonhecho"
                                    onClick={() => marcarComoHecho(index)}
                                >
                                    Realizada
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="cuadroencuestas">
                    <h2>Encuestas Realizadas</h2>
                    <ul className="listaencuestas">
                        {encuestasTerminadas.map((encuesta, index) => (
                            <li key={index}>
                                {encuesta.titulo}
                                <span className="estadoencuesta">Completada</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EncuestaEmpleado;