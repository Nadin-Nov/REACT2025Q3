import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { AboutPage } from './pages/AboutPage';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path=":page" element={<MainPage />}>
          <Route path=":detailsId" element={<MainPage />} />
        </Route>
      </Route>

      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
