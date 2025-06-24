import React, { useState, useRef, useEffect } from 'react';
import '../../CSS/Cmd.css';

// Rutas y archivos simulados
const rutasDisponibles = [
  "C:/user/desktop",
  "C:/user/desktop/carpeta",
  "C:/user/desktop/tareas",
  "C:/user/",
  "C:/user/desktop/carpeta/fotos"
];

const archivosPorRuta = {
  "C:/user/desktop": ["carpeta", "tareas"],
  "C:/user/desktop/tareas": ["tareas.txt"],
  "C:/user/": ["desktop"],
  "C:/user/desktop/carpeta/fotos": ["foto1.jpg", "foto2.jpg"]
};

const DEFAULT_PATH = "C:/user/desktop";

const CmdApp = () => {
  const [ruta, setRuta] = useState(DEFAULT_PATH);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  // Scroll automático al fondo
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Lógica de comandos
  const ComandoCheker = (mensaje) => {
    const args = mensaje.trim().split(' ');
    const comando = args[0].toLowerCase();

    if (comando === 'clear') {
      setChat([]);
      return;
    }

    if (comando === 'help') {
      RespuestaCmd('Comandos disponibles:\nhelp\nclear\ndir\nls\ncd [ruta]\nnano [archivo]');
      return;
    }

    if (comando === 'dir') {
      // Mostrar carpetas de la ruta actual
      const carpetas = (archivosPorRuta[ruta] || []).filter(nombre =>
        rutasDisponibles.includes(`${ruta}/${nombre}`.replace(/\\/g, '/'))
      );
      if (carpetas.length === 0) {
        RespuestaCmd('No hay carpetas en este directorio.');
      } else {
        RespuestaCmd(carpetas.join('      '));
      }
      return;
    }

    if (comando === 'ls') {
      // Mostrar archivos de la ruta actual
      const archivos = (archivosPorRuta[ruta] || []).filter(nombre =>
        !rutasDisponibles.includes(`${ruta}/${nombre}`.replace(/\\/g, '/'))
      );
      if (archivos.length === 0) {
        RespuestaCmd('No hay archivos en este directorio.');
      } else {
        RespuestaCmd(archivos.join('      '));
      }
      return;
    }

    if (comando === 'cd') {
      let nuevaRuta = args.slice(1).join(' ').trim();
      if (!nuevaRuta) {
        RespuestaCmd('Uso: cd [ruta]', '#FF0000');
        return;
      }
      // Si es ruta absoluta y existe
      if (rutasDisponibles.includes(nuevaRuta)) {
        setRuta(nuevaRuta);
        return;
      }
      // Si es relativa
      if (nuevaRuta.startsWith('/')) {
        // Quita barra inicial y concatena
        let base = ruta.endsWith('/') ? ruta.slice(0, -1) : ruta;
        let posible = `${base}${nuevaRuta}`.replace(/\\/g, '/');
        if (rutasDisponibles.includes(posible)) {
          setRuta(posible);
          return;
        }
      } else {
        // Relativa sin barra
        let posible = `${ruta}/${nuevaRuta}`.replace(/\\/g, '/');
        if (rutasDisponibles.includes(posible)) {
          setRuta(posible);
          return;
        }
      }
      RespuestaCmd('La ruta no existe.', '#FF0000');
      return;
    }

    if (comando === 'nano') {
      // Solo muestra mensaje, la lógica se hará después
      RespuestaCmd('Función nano aún no implementada.');
      return;
    }

    RespuestaCmd(`'${mensaje}' no se reconoce como un comando interno o externo.`, '#FF0000');
  };

  // Función para añadir respuesta al chat
  const RespuestaCmd = (res, color) => {
    setChat((prev) => [
      ...prev,
      { tipo: 'respuesta', texto: res, color: color }
    ]);
  };

  // Enviar mensaje
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setChat((prev) => [
      ...prev,
      { tipo: 'usuario', ruta: ruta, texto: input }
    ]);
    ComandoCheker(input);
    setInput('');
  };

  return (
    <div className="CmdApp">
      <div className="cmd-chat-area">
        {chat.map((msg, idx) =>
          msg.tipo === 'usuario' ? (
            <div className="cmd-line" key={idx}>
              <span className="cmd-path">{msg.ruta}&gt; </span>
              <span>{msg.texto}</span>
            </div>
          ) : (
            <div className="cmd-response" key={idx}>
              <span style={msg.color ? { color: msg.color } : {}}>{msg.texto}</span>
            </div>
          )
        )}
        <div ref={chatEndRef} />
      </div>
      <form className="cmd-form" onSubmit={handleSend}>
        <span className="cmd-path">{ruta}&gt;</span>
        <input
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default CmdApp;
