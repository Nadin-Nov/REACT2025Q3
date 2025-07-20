import { render, screen, fireEvent } from '@testing-library/react';

import ErrorButton from './ErrorButton';

describe('ErrorButton Component', () => {
  it('renders the button', () => {
    render(<ErrorButton />);
    expect(screen.getByRole('button', { name: /destroy the universe/i })).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', () => {
    render(<ErrorButton />);

    const button = screen.getByRole('button', { name: /destroy the universe/i });

    expect(() => {
      fireEvent.click(button);
    }).toThrow('Test');
  });
});
