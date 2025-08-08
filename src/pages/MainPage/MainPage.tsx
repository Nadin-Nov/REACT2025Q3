import clsx from 'clsx';
import type { FC } from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';

import { SearchSection } from '../../components/SearchSection';

import styles from './MainPage.module.css';

export const MainPage: FC = () => {
  const { detailsId, page } = useParams<{
    detailsId?: string;
    page?: string;
  }>();

  const currentPage = page ?? '1';

  if (!/^\d+$/.test(currentPage) || Number(currentPage) < 1) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div
      className={clsx(
        styles['main-page'],
        detailsId ? styles['with-details'] : styles['no-details']
      )}
      data-testid="main-page"
    >
      <div
        className={clsx(
          styles['main-page__left'],
          detailsId ? styles['with-details'] : styles['full-width']
        )}
      >
        <SearchSection currentPage={currentPage} />
      </div>

      {detailsId && (
        <div className={styles['main-page__right']}>
          <Outlet />
        </div>
      )}
    </div>
  );
};
