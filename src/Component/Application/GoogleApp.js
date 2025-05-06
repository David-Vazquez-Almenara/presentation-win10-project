
import React, { useEffect } from 'react';

const GoogleApp = () => {
  // === SEARCH ENGINE ID (CX) AQUÍ ===
  const CX = 'e4e372c5ab8c44434';
  // =====================================

  useEffect(() => {
    // Evita añadir el script varias veces
    if (document.getElementById('google-cse')) return;
    const script = document.createElement('script');
    script.id = 'google-cse';
    script.src = `https://cse.google.com/cse.js?cx=${CX}`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      const s = document.getElementById('google-cse');
      if (s) document.body.removeChild(s);
    };
  }, [CX]);

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Buscador Google</h1>
      {/* Solo el input de búsqueda */}
      <div className="gcse-searchbox-only"></div>
      {/* Solo los resultados, en el mismo componente */}
      <div className="gcse-searchresults-only" style={{ marginTop: 20 }}></div>
    </div>
  );
};

export default GoogleApp;
