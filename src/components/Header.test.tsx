import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, afterEach, vi, expect } from 'vitest';

import { Header } from './Header';

vi.mock('./NavMenu', () => ({
  NavMenu: () => <nav aria-label="main navigation">Mocked NavMenu</nav>,
}));
vi.mock('./ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <button aria-label="toggle theme">Toggle Theme</button>,
}));

describe('Header', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  const renderHeader = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

  it('should render the main heading', () => {
    renderHeader();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Get Schwifty'
    );
  });

  it('should render the navigation menu', () => {
    renderHeader();

    expect(
      screen.getByRole('navigation', { name: /main navigation/i })
    ).toBeInTheDocument();
  });

  it('should render the theme toggle button', () => {
    renderHeader();

    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument();
  });
});
