import { Outlet, useParams } from 'react-router-dom';

import { SearchSection } from '../components/SearchSection';
import './MainPage.css';

export const MainPage = () => {
  const { detailsId } = useParams();

  return (
    <div className={`main-page ${detailsId ? 'with-details' : 'no-details'}`} data-testid="main-page">
      <div className={`main-page__left ${detailsId ? 'with-details' : 'full-width'}`}>
        <SearchSection />
      </div>

      {detailsId && (
        <div className="main-page__right">
          <Outlet />
        </div>
      )}
    </div>
  );
};
