import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { routes } from './routes/routes';

export const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  </BrowserRouter>
);
