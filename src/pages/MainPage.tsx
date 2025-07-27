import { Outlet, useParams, Navigate } from 'react-router-dom';

import { SearchSection } from '../components/SearchSection';
import './MainPage.css';

export const MainPage = () => {
  const { detailsId, page } = useParams<{ detailsId?: string; page?: string }>();

  const currentPage = page ?? '1';

  if (!/^\d+$/.test(currentPage) || Number(currentPage) < 1) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className={`main-page ${detailsId ? 'with-details' : 'no-details'}`} data-testid="main-page">
      <div className={`main-page__left ${detailsId ? 'with-details' : 'full-width'}`}>
        <SearchSection currentPage={currentPage} />
      </div>

      {detailsId && (
        <div className="main-page__right">
          <Outlet />
        </div>
      )}
    </div>
  );
};
