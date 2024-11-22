import React from 'react';
import Draggable from 'react-draggable';
import '../CSS/Window.css';
import ApplicationsMap from './ApplicationsMap';

const Window = ({ app, closeApp, zIndex, onClick }) => {
  if (!app || !app.component) {
    return null;
  }

  const ComponentToRender = ApplicationsMap[app.component];

  // Calcular la posición central de la ventana
  const windowWidth = 20;
  const windowHeight = 20;

  const leftPosition = `calc(35vw - ${windowWidth / 2}vw)`;
  const topPosition = `calc(20vh - ${windowHeight / 2}vh)`;

  return (
    <Draggable bounds="#Desktop-Background" handle=".window-header">
      <div 
        className="window" 
        style={{ left: leftPosition, top: topPosition, zIndex }} 
        onClick={onClick}
      >
        <div className="window-header">
          <span>{app.name}</span>
          <button className="close-btn" onClick={closeApp}>X</button>
        </div>
        <div className="window-content">
          {ComponentToRender ? <ComponentToRender /> : <p>Componente no encontrado.</p>}
        </div>
      </div>
    </Draggable>
  );
};


// Componente para cambiar tamaño a APPs

document.querySelectorAll('.resizer').forEach(resizer => {
  const windowElement = resizer.parentElement;

  resizer.addEventListener('mousedown', e => {
    e.preventDefault();
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);

    function resize(event) {
      const rect = windowElement.getBoundingClientRect();

      if (resizer.classList.contains('bottom-right')) {
        windowElement.style.width = event.pageX - rect.left + 'px';
        windowElement.style.height = event.pageY - rect.top + 'px';
      } else if (resizer.classList.contains('bottom-left')) {
        windowElement.style.width = rect.right - event.pageX + 'px';
        windowElement.style.height = event.pageY - rect.top + 'px';
        windowElement.style.left = event.pageX + 'px';
      } else if (resizer.classList.contains('top-right')) {
        windowElement.style.width = event.pageX - rect.left + 'px';
        windowElement.style.height = rect.bottom - event.pageY + 'px';
        windowElement.style.top = event.pageY + 'px';
      } else if (resizer.classList.contains('top-left')) {
        windowElement.style.width = rect.right - event.pageX + 'px';
        windowElement.style.height = rect.bottom - event.pageY + 'px';
        windowElement.style.top = event.pageY + 'px';
        windowElement.style.left = event.pageX + 'px';
      }
    }

    function stopResize() {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    }
  });
});


export default Window;
