import { useTheme } from '../context/useTheme';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle" aria-label="toggle theme">
      <button
        type="button"
        className={`theme-button white ${theme === 'light' ? 'active' : ''}`}
        aria-pressed={theme === 'light'}
        onClick={() => theme !== 'light' && toggleTheme()}
        title="light theme"
      />
      <button
        type="button"
        className={`theme-button black ${theme === 'dark' ? 'active' : ''}`}
        aria-pressed={theme === 'dark'}
        onClick={() => theme !== 'dark' && toggleTheme()}
        title="dark theme"
      />
    </div>
  );
};
