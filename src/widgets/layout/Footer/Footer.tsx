import type { FC } from 'react';

import styles from './Footer.module.css';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <span>© 2025 React Forms</span>
      <a
        href="https://github.com/Nadin-Nov"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        GitHub
      </a>
    </footer>
  );
};
