import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { ResultsList } from './ResultsList';

vi.mock('./ResultCard', () => ({
  ResultCard: ({ id, name }: { id: number; name: string }) => (
    <div data-testid="result-card">
      {name} (ID: {id})
    </div>
  ),
}));

describe('ResultsList', () => {
  it('renders no results message if characters list is empty', () => {
    render(<ResultsList characters={[]} currentPage={1} />);
    expect(screen.getByText(/Uh oh! Nobody here…/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Maybe they’re hiding in some crazy alternate dimension!/i
      )
    ).toBeInTheDocument();
  });

  it('renders ResultCard components for each character', () => {
    const characters = [
      { id: 1, name: 'Rick', description: 'Smart guy', image: 'rick.png' },
      { id: 2, name: 'Morty', description: 'Nervous kid', image: 'morty.png' },
    ];

    render(<ResultsList characters={characters} currentPage={3} />);
    const cards = screen.getAllByTestId('result-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Rick (ID: 1)');
    expect(cards[1]).toHaveTextContent('Morty (ID: 2)');
  });
});
