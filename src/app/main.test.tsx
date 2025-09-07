import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import App from '../App';

import { store } from './store';

beforeEach(() => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Main entry point', () => {
  it('should render App inside #root', () => {
    const rootElement = document.getElementById('root')!;

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { container: rootElement }
    );

    expect(screen.getByText(/Open Hook Modal/i)).toBeInTheDocument();
  });
});
