import React, { useState } from 'react';
import appData from '../Data/appsData.json'; // Importa los datos de las aplicaciones
import '../CSS/DesktopBackground.css'; // Importa el CSS correcto
import Window from './Window'; // Importa el componente Window
import Taskbar from './Taskbar'; // Importa el componente Taskbar

function DesktopBackground() {
  const [openApps, setOpenApps] = useState({}); // Estado para rastrear las aplicaciones abiertas
  const [activeAppId, setActiveAppId] = useState(null); // Estado para rastrear la aplicación activa
  const [zIndexes, setZIndexes] = useState({}); // Estado para rastrear el z-index de cada ventana

  // Función para abrir una aplicación
  const openApp = (appId) => {
    setOpenApps((prevState) => ({
      ...prevState,
      [appId]: true, // Marca la aplicación como abierta
    }));
    setActiveAppId(appId); // Establece la aplicación como activa
    // Inicializa el z-index al abrir
    setZIndexes((prevState) => ({ ...prevState, [appId]: Object.keys(prevState).length }));
  };

  // Función para cerrar una aplicación
  const closeApp = (appId) => {
    setOpenApps((prevState) => ({
      ...prevState,
      [appId]: false, // Marca la aplicación como cerrada
    }));
    // Elimina el z-index al cerrar
    setZIndexes((prevState) => {
      const newZIndexes = { ...prevState };
      delete newZIndexes[appId]; // Elimina el z-index
      return newZIndexes;
    });
  };

  // Función para llevar la ventana al frente
  const bringWindowToFront = (appId) => {
    const newZIndexes = { ...zIndexes };
    // Aumenta el z-index de la ventana clickeada
    newZIndexes[appId] = Math.max(...Object.values(newZIndexes), 0) + 1; // Aumenta el z-index
    setZIndexes(newZIndexes);
    setActiveAppId(appId); // Establece la aplicación como activa
  };

  return (
    <div id="Desktop-Background">
      {/* Renderiza los íconos de las aplicaciones */}
      <div className="icon-grid">
        {appData.applications.map((app) => (
          <div
            key={app.id}
            className="app-icon"
            onClick={() => openApp(app.id)} // Al hacer clic, abre la aplicación
          >
            <img
              src={app.icon}
              alt={`${app.name} icon`}
              className="icon-image"
            />
            <p>{app.name}</p>
          </div>
        ))}
      </div>

      {/* Renderiza las ventanas abiertas */}
      {appData.applications.map((app) => (
        openApps[app.id] && app && ( // Asegúrate de que 'app' existe antes de renderizar
          <Window
            key={app.id}
            app={app}
            closeApp={() => closeApp(app.id)} // Pasa la función para cerrar la aplicación
            zIndex={zIndexes[app.id] || 0} // Pasa el z-index correspondiente
            onClick={() => bringWindowToFront(app.id)} // Llama a la función al hacer clic
          />
        )
      ))}

      {/* Renderiza la barra de tareas y pasa las props necesarias */}
      <Taskbar openApps={openApps} activeAppId={activeAppId} />
    </div>
  );
}

export default DesktopBackground;
