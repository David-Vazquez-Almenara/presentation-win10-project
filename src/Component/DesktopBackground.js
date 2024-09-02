import React from 'react';
import appData from '../Data/appsData.json'; // Importa los datos de las aplicaciones
import '../CSS/DesktopBackground.css'; // Importa el CSS correcto

function DesktopBackground() {
  return (
    <div id="Desktop-Background">


      {/* Renderiza los íconos de las aplicaciones */}

      <div className="icon-grid"> 
        {appData.applications.map((app) => (
          <div key={app.id} className="app-icon"> {/* Crea una key con la ID usando el JSON */}
            <img
            // Usa la propiedad 'app.X' del JSON
              src={app.icon} 
              alt={app.name + " icon"}
              className="icon-image"
            />
            <p>{app.name}</p>
          </div>
        ))}
      </div>


    </div>
  );
}

export default DesktopBackground;
