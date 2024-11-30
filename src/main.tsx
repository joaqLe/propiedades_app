import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './pages/AuthContext'; // Importa el AuthProvider

// Selecciona el contenedor donde se renderizará la aplicación
const container = document.getElementById('root');
const root = createRoot(container!);

// Renderiza la aplicación dentro del AuthProvider para proporcionar el contexto de autenticación
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
