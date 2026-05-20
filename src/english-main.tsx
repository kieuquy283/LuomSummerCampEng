import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import EnglishTeamPage from './pages/EnglishTeamPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EnglishTeamPage />
  </StrictMode>,
);
