import type { FC } from 'react';

import styles from './Header.module.css';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <img src="/favicon.webp" alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>React Forms</h1>
    </header>
  );
};
