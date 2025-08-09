import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, afterEach, expect } from 'vitest';

import { useTheme } from '../../context/useTheme';

import { ThemeToggle } from './ThemeToggle';

vi.mock('../../context/useTheme');

describe('ThemeToggle', () => {
  const toggleThemeMock = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    toggleThemeMock.mockClear();
  });

  const mockedUseTheme = vi.mocked(useTheme, { partial: true });

  function setup(theme: 'light' | 'dark') {
    mockedUseTheme.mockReturnValue({
      theme,
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeToggle />);
  }

  it('should render two buttons with correct aria-pressed attributes', () => {
    setup('light');

    const lightBtn = screen.getByRole('button', { name: /light theme/i });
    const darkBtn = screen.getByRole('button', { name: /dark theme/i });

    expect(lightBtn).toHaveAttribute('aria-pressed', 'true');
    expect(darkBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('should call toggleTheme when clicking on inactive theme button', async () => {
    setup('light');

    const darkBtn = screen.getByRole('button', { name: /dark theme/i });
    await userEvent.click(darkBtn);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it('should not call toggleTheme when clicking on active theme button', async () => {
    setup('light');

    const lightBtn = screen.getByRole('button', { name: /light theme/i });
    await userEvent.click(lightBtn);

    expect(toggleThemeMock).not.toHaveBeenCalled();
  });
});
