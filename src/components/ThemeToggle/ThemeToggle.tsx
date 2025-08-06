import type { FC } from 'react';

import { useTheme } from '../../context/useTheme';

import styles from './ThemeToggle.module.css';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles['theme-toggle']} aria-label="toggle theme">
      <button
        type="button"
        className={`${styles['theme-button']} ${styles.white} ${theme === 'light' ? styles.active : ''}`}
        aria-pressed={theme === 'light'}
        onClick={() => theme !== 'light' && toggleTheme()}
        title="light theme"
      />
      <button
        type="button"
        className={`${styles['theme-button']} ${styles.black} ${theme === 'dark' ? styles.active : ''}`}
        aria-pressed={theme === 'dark'}
        onClick={() => theme !== 'dark' && toggleTheme()}
        title="dark theme"
      />
    </div>
  );
};
