import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppression complète de l'Analytics pour tester si c'est la cause du problème
// Nous le réintégrerons plus tard d'une autre façon

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
