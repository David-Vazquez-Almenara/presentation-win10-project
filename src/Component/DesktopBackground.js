import React, { useState } from 'react';
import appData from '../Data/appsData.json'; // Importa los datos de las aplicaciones
import '../CSS/DesktopBackground.css'; // Importa el CSS correcto
import Window from './Window'; // Importa el componente Window

function DesktopBackground() {
  const [openApps, setOpenApps] = useState({}); // Estado para rastrear las aplicaciones abiertas

  // Función para abrir una aplicación
  const openApp = (appId) => {
    setOpenApps((prevState) => ({
      ...prevState,
      [appId]: true, // Marca la aplicación como abierta
    }));
  };

  // Función para cerrar una aplicación
  const closeApp = (appId) => {
    setOpenApps((prevState) => ({
      ...prevState,
      [appId]: false, // Marca la aplicación como cerrada
    }));
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
          />
        )
      ))}
    </div>
  );
}

export default DesktopBackground;
