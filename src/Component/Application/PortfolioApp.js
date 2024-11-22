import React from 'react';
import '../../CSS/WindowsComponents.css'

const PortfolioApp = () => {
  return (
    <div className="window-content">
      <iframe 
        src="/resources/CV.pdf" 
        title="CV"


        //Se supone que esto hace que los enlaces del pdf se abran en otra pestaña, pero no va
        /*
        onLoad={(e) => {
          const iframe = e.target;
          // Verifica que el PDF cargue correctamente
          const iframeDoc = iframe.contentWindow.document;
          const links = iframeDoc.querySelectorAll('a');
          links.forEach(link => {
            link.setAttribute('target', '_blank');
          });
        }}
        */
      />
    </div>
  );
};

export default PortfolioApp;
