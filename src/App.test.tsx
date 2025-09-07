import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import App from './App';
import { store } from './app/store';

beforeEach(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('App component', () => {
  it('should render main page with modal buttons', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Open Hook Modal/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Uncontrolled Modal/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /React Forms/i })
    ).toBeInTheDocument();
  });
});
