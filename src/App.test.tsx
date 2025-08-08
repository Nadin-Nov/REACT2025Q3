import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, it, describe, expect } from 'vitest';

import { App } from './App';

vi.mock('./pages/MainPage/MainPage', () => ({
  MainPage: () => <div data-testid="main-page">Mocked MainPage</div>,
}));

describe('App', () => {
  it('should render MainPage on /1 route', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});
