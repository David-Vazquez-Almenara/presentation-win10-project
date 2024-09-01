import React from 'react';
import DesktopBackground from './DesktopBackground';
import Taskbar from './Taskbar';
import Window from './Window'; // Importamos la nueva versión de Window.js

function Desktop() {
  return (
    <div id='Main-Container'>
      {/* Fondo del escritorio */}
      <DesktopBackground />

      {/* Barra inferior */}
      <Taskbar />

      {/* Ventanas de aplicaciones */}
      <Window />
    </div>
  );
}

export default Desktop;
