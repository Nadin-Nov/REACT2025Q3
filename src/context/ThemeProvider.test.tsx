import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi } from 'vitest';

import { ThemeProvider } from '../context/ThemeProvider';
import { useTheme } from '../context/useTheme';

describe('ThemeProvider + useTheme', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
      <>
        <div>Current theme: {theme}</div>
        <button aria-label="Toggle theme" onClick={toggleTheme}>
          Toggle
        </button>
      </>
    );
  };

  it('should render with initial theme "light"', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText(/Current theme: light/)).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should toggle theme when button clicked', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });

    expect(screen.getByText(/Current theme: light/)).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    await user.click(toggleButton);

    expect(screen.getByText(/Current theme: dark/)).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    await user.click(toggleButton);

    expect(screen.getByText(/Current theme: light/)).toBeInTheDocument();
  });

  it('should throw error if useTheme used outside ThemeProvider', () => {
    const BrokenComponent = () => {
      useTheme();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      'useTheme must be used within ThemeProvider'
    );
  });
});
