import { render, screen } from '@testing-library/react';

import {App} from './App';

vi.mock('./pages/MainPage', () => ({
  MainPage: () => <div data-testid="main-page">Mocked MainPage</div>,
}));

describe('App', () => {
  test('renders MainPage', () => {
    render(<App />);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});
