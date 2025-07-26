import { Outlet } from 'react-router-dom';

import './NotFoundPage.css';
import './MainPage.css';
import { SearchSection } from '../components/SearchSection';

export const MainPage = () => {
  return (
    <div className="main-page" data-testid="main-page">
      <div className="main-page__left">
        <SearchSection />
      </div>
      <div className="main-page__right">
        <Outlet />
      </div>
    </div>
  );
};
