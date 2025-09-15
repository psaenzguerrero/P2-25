import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  // ← Solo esto, sin Router
    <App />            // ← Tu App.js ya maneja el routing
  </React.StrictMode>
);