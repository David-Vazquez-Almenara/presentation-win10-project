import React from 'react';
import ReactDOM from 'react-dom/client';
import MainBackground from './Component/MainBackground.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainBackground />
  </React.StrictMode>
);

reportWebVitals();
