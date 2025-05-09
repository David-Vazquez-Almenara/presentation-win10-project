import React, { useState, useEffect } from 'react';
import appData from '../Data/appsData.json'; // Importa los datos de las aplicaciones
import '../CSS/DesktopBackground.css'; // Importa el CSS correcto
import Window from './Window'; // Importa el componente Window
import Taskbar from './Taskbar'; // Importa el componente Taskbar

function DesktopBackground() {
  const totalSlots = 10 * 6; // 60 casillas

  // Estados para ventanas y layers
  const [openApps, setOpenApps] = useState({});
  const [activeAppId, setActiveAppId] = useState(null);
  const [zIndexes, setZIndexes] = useState({});
  // Estado para la cuadrícula de íconos (apps o null)
  const [iconsSlots, setIconsSlots] = useState(() => Array(totalSlots).fill(null));

  // useEffect para leer/escribir posiciones en localStorage
  useEffect(() => {
    const raw = localStorage.getItem('desktopLayout');
    let savedEntries = [];

    try {
      savedEntries = raw ? JSON.parse(raw) : [];
    } catch {
      savedEntries = [];
    }

    // Mezcla datos iniciales con lo guardado (fallback a app.posicionTabla)
    const initialEntries = appData.applications.map((app) => {
      const found = savedEntries.find((e) => e.id === app.id);
      return {
        id: app.id,
        posicionTabla: found?.posicionTabla ?? app.posicionTabla,
      };
    });

    // Resolver duplicados, rangos inválidos y asignar huecos libres
    const occupied = new Set();
    const finalEntries = initialEntries.map((entry) => {
      let pos = Number(entry.posicionTabla);
      if (!pos || pos < 1 || pos > totalSlots || occupied.has(pos)) {
        for (let i = 1; i <= totalSlots; i++) {
          if (!occupied.has(i)) {
            pos = i;
            break;
          }
        }
      }
      occupied.add(pos);
      return { id: entry.id, posicionTabla: pos };
    });

    // Guardar la configuración limpia en localStorage
    localStorage.setItem('desktopLayout', JSON.stringify(finalEntries));

    // Construir array de slots con apps o null
    const slots = Array(totalSlots).fill(null);
    finalEntries.forEach(({ id, posicionTabla }) => {
      const app = appData.applications.find((a) => a.id === id);
      if (app) {
        slots[posicionTabla - 1] = app;
      }
    });

    setIconsSlots(slots);
  }, [totalSlots]); // Añadido totalSlots como dependencia para ESLint

  // Función para abrir una aplicación
  const openApp = (appId) => {
    setOpenApps((prev) => ({ ...prev, [appId]: true }));
    setActiveAppId(appId);
    setZIndexes((prev) => ({ ...prev, [appId]: Object.keys(prev).length }));
  };

  // Función para cerrar una aplicación
  const closeApp = (appId) => {
    setOpenApps((prev) => ({ ...prev, [appId]: false }));
    setZIndexes((prev) => {
      const next = { ...prev };
      delete next[appId];
      return next;
    });
  };

  // Función para llevar la ventana al frente
  const bringWindowToFront = (appId) => {
    const next = { ...zIndexes };
    next[appId] = Math.max(...Object.values(next), 0) + 1;
    setZIndexes(next);
    setActiveAppId(appId);
  };

  return (
    <div id="Desktop-Background">
      {/* Icon Grid fija */}
      <div className="icon-grid">
        {iconsSlots.map((app, idx) =>
          app ? (
            <div
              key={app.id}
              className="app-icon"
              onClick={() => openApp(app.id)}
            >
              <img
                src={app.icon}
                alt={`${app.name} icon`}
                className="icon-image"
              />
              <p>{app.name}</p>
            </div>
          ) : (
            <div key={`empty-${idx}`} className="app-icon empty-slot" />
          )
        )}
      </div>

      {/* Ventanas abiertas */}
      {appData.applications.map(
        (app) =>
          openApps[app.id] && (
            <Window
              key={app.id}
              app={app}
              closeApp={() => closeApp(app.id)}
              zIndex={zIndexes[app.id] || 0}
              onClick={() => bringWindowToFront(app.id)}
            />
          )
      )}

      {/* Barra de tareas */}
      <Taskbar openApps={openApps} activeAppId={activeAppId} />
    </div>
  );
}

export default DesktopBackground;
