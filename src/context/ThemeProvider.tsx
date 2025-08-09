import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';

import { ThemeContext } from './ThemeContext';

export type Theme = 'light' | 'dark';

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
