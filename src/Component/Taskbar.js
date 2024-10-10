import React from 'react';
import appData from '../Data/appsData.json'; // Importa los datos de las aplicaciones
import '../CSS/Taskbar.css';

const Taskbar = () => {
  return (
    <div id='Win-Bar'>
      <div id='Main-Button-div'>
        <img src='./img/logo/win10-Logo-white.png' id='Win-Main-Button' alt='WIN_BUTTON' />
      </div>

      <div id='Search-bar-div'>
        <img src='./img/icon/search.png' alt='SEARCH_ICON' />
        <textarea placeholder='Search' />
      </div>

      <div id='AppsIcon'>
        <table>
          <tr>
            {/* Mapear las aplicaciones para generar las celdas de manera automática */}
            {appData.applications.map((app) => (
              <td key={app.id}>
                <img src={app.icon} alt={`${app.name} icon`} className="app-icon-img" />
              </td>
            ))}
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Taskbar;
