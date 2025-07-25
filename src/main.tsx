import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/theme.css';
import './index.css';
import './styles/index.css';

import {App} from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
