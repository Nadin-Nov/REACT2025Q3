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

      <Route path="/:page" element={<MainPage />}>
        <Route path=":detailsId?" element={<DetailsPanel />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
