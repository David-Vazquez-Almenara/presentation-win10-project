// PresentationApp.js
import React from 'react';
import '../../CSS/WindowsComponents.css';

const PresentationApp = () => (
  <div
    style={{
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      zIndex: 9999,
    }}
  >
    <iframe
      src="https://david-vazquez-almenara.netlify.app/"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        display: 'block',
      }}
      title="Presentation"
      allowFullScreen
    />
  </div>
);

export default PresentationApp;
