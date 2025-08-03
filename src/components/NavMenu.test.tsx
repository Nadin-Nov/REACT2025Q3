import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { NavMenu } from './NavMenu';

describe('NavMenu', () => {
  it('should render navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavMenu />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /main/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('should apply active-link class to main route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavMenu />
      </MemoryRouter>
    );

    const mainLink = screen.getByRole('link', { name: /main/i });
    expect(mainLink).toHaveClass('active-link');

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).not.toHaveClass('active-link');
  });

  it('should apply active-link class to about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <NavMenu />
      </MemoryRouter>
    );

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveClass('active-link');

    const mainLink = screen.getByRole('link', { name: /main/i });
    expect(mainLink).not.toHaveClass('active-link');
  });
});
