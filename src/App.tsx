import { Routes, Route, Navigate } from 'react-router-dom';

import { DetailsPanel } from './components/DetailsPanel';
import { AboutPage } from './pages/AboutPage';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/1" replace />} />

      <Route path="/about" element={<AboutPage />} />

      <Route path="/404" element={<NotFoundPage />} />

      <Route path="/:page" element={<MainPage />}>
        <Route path=":detailsId?" element={<DetailsPanel />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
