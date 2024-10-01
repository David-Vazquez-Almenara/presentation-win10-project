import React from 'react';
import Draggable from 'react-draggable';
import '../CSS/Window.css';
import ApplicationsMap from './ApplicationsMap'; // Importa el mapeo de componentes

const Window = ({ app, closeApp }) => {
  // Asegúrate de que app y app.component están definidos
  if (!app || !app.component) {
    return null; // No renderizar nada si app o su componente no existen
  }

  const ComponentToRender = ApplicationsMap[app.component]; // Obtén el componente correcto

  // Calcular la posición central de la ventana
  const windowWidth = 20; // Utiliza 20vw como el ancho de la ventana
  const windowHeight = 20; // Utiliza 20vh como la altura de la ventana

  const leftPosition = `calc(50vw - ${windowWidth / 2}vw)`; // Posición horizontal centrada
  const topPosition = `calc(50vh - ${windowHeight / 2}vh)`; // Posición vertical centrada

  return (
    <Draggable bounds="#Desktop-Background">
      <div className='window' style={{ left: leftPosition, top: topPosition }}>
        <div className='window-header'>
          <span>{app.name}</span>
          <button className='close-btn' onClick={closeApp}>X</button> {/* Cierra la ventana */}
        </div>
        <div className='window-content'>
          {ComponentToRender ? <ComponentToRender /> : <p>Componente no encontrado.</p>}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
