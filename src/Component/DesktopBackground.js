import React, { useState, useEffect } from 'react';
import appData from '../Data/appsData.json'; // Importa los datos de las aplicaciones
import '../CSS/DesktopBackground.css'; // Importa el CSS correcto
import Window from './Window'; // Importa el componente Window
import Taskbar from './Taskbar'; // Importa el componente Taskbar

function DesktopBackground() {
  const cols = 10;
  const rows = 6;
  const totalSlots = cols * rows; // 60 casillas

  // Estados para ventanas y layers
  const [openApps, setOpenApps] = useState({});
  const [activeAppId, setActiveAppId] = useState(null);
  const [zIndexes, setZIndexes] = useState({});
  // Estado para la cuadrícula de íconos (apps o null)
  const [iconsSlots, setIconsSlots] = useState(() => Array(totalSlots).fill(null));

  // Leer/escribir posiciones en localStorage al montar
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

    // Construir array de slots con apps o null
    const slots = Array(totalSlots).fill(null);
    finalEntries.forEach(({ id, posicionTabla }) => {
      const app = appData.applications.find((a) => a.id === id);
      if (app) slots[posicionTabla - 1] = app;
    });

    setIconsSlots(slots);
    localStorage.setItem('desktopLayout', JSON.stringify(finalEntries));
  }, [totalSlots]);

  // Drag & Drop Handlers
  const handleDragStart = (e, idx) => {
    // Añade clase para mostrar bordes punteados
    const gridEl = document.querySelector('.icon-grid');
    gridEl.classList.add('dragging');

    // Usar el contenedor como imagen arrastrada
    const crt = e.currentTarget.cloneNode(true);
    crt.style.position = 'absolute';
    crt.style.top = '-1000px';
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, crt.offsetWidth / 2, crt.offsetHeight / 2);
    setTimeout(() => document.body.removeChild(crt), 0);

    e.dataTransfer.setData('draggedIdx', idx);
  };

  const handleDragEnd = () => {
    // Quita clase al terminar el drag
    const gridEl = document.querySelector('.icon-grid');
    gridEl.classList.remove('dragging');
  };

  const handleDragOverGrid = (e) => {
    e.preventDefault();
  };

  const handleDropGrid = (e) => {
    e.preventDefault();
    const draggedIdx = parseInt(e.dataTransfer.getData('draggedIdx'), 10);
    if (isNaN(draggedIdx)) {
      handleDragEnd();
      return;
    }

    const grid = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - grid.left;
    const y = e.clientY - grid.top;
    const cellWidth = grid.width / cols;
    const cellHeight = grid.height / rows;
    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);
    if (col < 0 || col >= cols || row < 0 || row >= rows) {
      handleDragEnd();
      return;
    }
    const dropIdx = row * cols + col;
    if (dropIdx === draggedIdx) {
      handleDragEnd();
      return;
    }

    const newSlots = [...iconsSlots];
    [newSlots[draggedIdx], newSlots[dropIdx]] = [newSlots[dropIdx], newSlots[draggedIdx]];
    setIconsSlots(newSlots);

    // Actualiza localStorage
    const updatedEntries = newSlots
      .map((app, i) => app && { id: app.id, posicionTabla: i + 1 })
      .filter(Boolean);
    localStorage.setItem('desktopLayout', JSON.stringify(updatedEntries));

    handleDragEnd();
  };

  // Funciones de ventanas
  const openApp = (appId) => {
    setOpenApps((prev) => ({ ...prev, [appId]: true }));
    setActiveAppId(appId);
    // Al abrir, poner al frente calculando el máximo zIndex y sumando 1
    setZIndexes((prev) => {
      const maxZ = prev && Object.values(prev).length
        ? Math.max(...Object.values(prev))
        : 0;
      return { ...prev, [appId]: maxZ + 1 };
    });
  };
  const closeApp = (appId) => {
    setOpenApps((prev) => ({ ...prev, [appId]: false }));
    setZIndexes((prev) => {
      const next = { ...prev };
      delete next[appId];
      return next;
    });
  };
  const bringWindowToFront = (appId) => {
    const next = { ...zIndexes };
    next[appId] = Math.max(...Object.values(next), 0) + 1;
    setZIndexes(next);
    setActiveAppId(appId);
  };

  return (
    <div id="Desktop-Background">
      {/* Grid con drag & drop a nivel de cuadrícula */}
      <div
        className="icon-grid"
        style={{ zIndex: -1 }}
        onDragOver={handleDragOverGrid}
        onDrop={handleDropGrid}
      >
        {iconsSlots.map((app, idx) =>
          app ? (
            <div
              key={app.id}
              className="app-icon"
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragEnd={handleDragEnd}
              onClick={() => openApp(app.id)}
            >
              <img
                src={app.icon}
                alt={`${app.name} icon`}
                className="icon-image"
                draggable={false}
              />
              <p draggable={false}>{app.name}</p>
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
