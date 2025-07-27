import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from './Header';

describe('Header', () => {
  it('renders the header title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /get schwifty/i })).toBeInTheDocument();
  });

  it('renders the NavMenu', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
});
