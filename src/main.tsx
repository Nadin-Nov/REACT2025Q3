import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Spinner from './components/Spinner/Spinner';
import './global.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner fullscreen={true} />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
