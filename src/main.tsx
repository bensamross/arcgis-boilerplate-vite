import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@esri/calcite-components/loader';
import '@esri/calcite-components/main.css';
import App from './App.tsx';

defineCustomElements();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <p>Hello World</p>
  </StrictMode>
);
