import { createContext } from 'react';

import type { ThemeContextValue } from './ThemeProvider';

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
