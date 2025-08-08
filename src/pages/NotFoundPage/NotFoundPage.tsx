import clsx from 'clsx';
import type { FC } from 'react';

import styles from './NotFoundPage.module.css';

export const NotFoundPage: FC = () => (
  <div className={clsx(styles['not-found-page'])}>
    <div className={clsx(styles['not-found-container'])}>
      <div className={clsx(styles['not-found-text'])}>
        Interphase connector failed to locate multiversal endpoint. Classic.
      </div>
    </div>
  </div>
);
