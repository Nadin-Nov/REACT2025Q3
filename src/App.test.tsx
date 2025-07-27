import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App } from './App';

vi.mock('./pages/MainPage', () => ({
  MainPage: () => <div data-testid="main-page">Mocked MainPage</div>,
}));

describe('App', () => {
  test('renders MainPage on /1 route', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});
