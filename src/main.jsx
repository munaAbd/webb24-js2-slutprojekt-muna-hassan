import React from 'react';
import ReactDOM from 'react-dom/client'; // Ändra denna import
import App from './ App'; // Se till att detta är rätt filväg

// Hitta elementet med id "root" i ditt HTML-dokument
const rootElement = document.getElementById('root');

// Använd createRoot istället för render
const root = ReactDOM.createRoot(rootElement);

// Rendera appen med createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

