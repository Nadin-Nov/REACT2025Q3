import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NavMenu } from './NavMenu';

describe('NavMenu', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavMenu />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /main/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('applies active-link class to active route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavMenu />
      </MemoryRouter>
    );

    const mainLink = screen.getByRole('link', { name: /main/i });
    expect(mainLink).toHaveClass('active-link');

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).not.toHaveClass('active-link');

    cleanup();

    render(
      <MemoryRouter initialEntries={['/about']}>
        <NavMenu />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /about/i })).toHaveClass('active-link');
    expect(screen.getByRole('link', { name: /main/i })).not.toHaveClass('active-link');
  });
});
