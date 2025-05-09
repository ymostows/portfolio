import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Analytics component
const AnalyticsWrapper = () => {
  // On n'utilise Analytics que dans l'environnement de production
  if (import.meta.env.PROD) {
    // Cette ligne sera omise en développement
    const { Analytics } = require('@vercel/analytics/react');
    return <Analytics />;
  }
  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <AnalyticsWrapper />
  </StrictMode>
);
