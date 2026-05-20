import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import DigitalTeamPage from './pages/DigitalTeamPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DigitalTeamPage />
  </StrictMode>,
);
