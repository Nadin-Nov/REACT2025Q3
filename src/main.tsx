import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/theme.css';
import './index.css';
import './styles/index.css';

import { App } from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import { Header } from './components/Header';
import { ThemeProvider } from './context/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <Header />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
