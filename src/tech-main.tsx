import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import TechEngineeringPage from './pages/TechEngineeringPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TechEngineeringPage />
  </StrictMode>,
);
