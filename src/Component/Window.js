import React from 'react';
import Draggable from 'react-draggable';
import '../CSS/Window.css';
import appData from '../Data/appsData.json';
import ApplicationsMap from './ApplicationsMap';

const Window = () => {
  return (
    <>
      {appData.applications.map(app => {
        const ComponentToRender = ApplicationsMap[app.component]; // Obtén el componente desde el ApplicationsMap

        return (
          <Draggable
            key={app.id}
            bounds="#Desktop-Background" // Limita el área de arrastre
          >
            <div className='window'>
              <div className='window-header'>
                <span>{app.name}</span>
                <button className='close-btn'>X</button>
              </div>
              <div className='window-content'>
                {/* Renderiza el componente dinámico */}
                {ComponentToRender ? <ComponentToRender /> : <p>Componente no encontrado.</p>}
              </div>
            </div>
          </Draggable>
        );
      })}
    </>
  );
};

export default Window;
