import { render, screen } from '@testing-library/react';

import { mockValidCharacters } from '../__tests__/characters';

import {ResultsList} from './ResultsList';

describe('ResultsList', () => {
  test('renders message when characters array is empty', () => {
    render(<ResultsList characters={[]} />);
    expect(
      screen.getByText(/uh oh! nobody here/i)
    ).toBeInTheDocument();
  });

  test('renders ResultCards for each character', () => {
    render(<ResultsList characters={mockValidCharacters} />);
    mockValidCharacters.forEach((char) => {
      expect(screen.getByText(char.name)).toBeInTheDocument();
    });
  });
});
