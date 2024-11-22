import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../CSS/Window.css';
import ApplicationsMap from './ApplicationsMap';

const Window = ({ app, closeApp, zIndex, onClick }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Estado para la posición

  if (!app || !app.component) {
    return null; 
  }

  const toggleFullScreen = () => {
    setIsFullScreen(prev => {
      // Si la ventana pasa a pantalla completa, reseteamos la posición a (0, 0)
      if (!prev) {
        setPosition({ x: 0, y: 0 }); // Establecemos la posición a la esquina superior izquierda
      }
      return !prev;
    });
  };

  const ComponentToRender = ApplicationsMap[app.component];

  const windowWidth = isFullScreen ? '100vw' : '50vw';
  const windowHeight = isFullScreen ? '100vh' : '70vh';

  // Si está en pantalla completa, la posición debe ser 0,0
  const leftPosition = isFullScreen ? '0' : `calc(50vw - ${parseFloat(windowWidth) / 2}vw)`;
  const topPosition = isFullScreen ? '0' : `calc(50vh - ${parseFloat(windowHeight) / 2}vh)`;

  return (
    <Draggable 
      bounds="#Desktop-Background" 
      handle=".window-header" 
      position={{ x: position.x, y: position.y }}  // Usamos el estado de la posición
      onStop={(e, data) => {
        setPosition({ x: data.x, y: data.y });  // Actualizamos la posición cuando la ventana deja de moverse
      }}
    >
      <div 
        className="window" 
        style={{
          left: leftPosition, 
          top: topPosition, 
          zIndex, 
          width: windowWidth, 
          height: windowHeight
        }} 
        onClick={onClick}
      >
        <div className="window-header">
          <span>{app.name}</span>
          <div>
            <button className="close-btn" onClick={closeApp}>X</button>
            <button className="fullscreen-btn" onClick={toggleFullScreen}>▢</button>
          </div>
        </div>
        <div className="window-content">
          {ComponentToRender ? <ComponentToRender /> : <p>Componente no encontrado.</p>}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
