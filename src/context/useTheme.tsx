import { useContext } from 'react';

import { ThemeContext } from './ThemeContext';
import type { ThemeContextValue } from './ThemeProvider';

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
