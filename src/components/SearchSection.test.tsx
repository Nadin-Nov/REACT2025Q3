import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, type Mock } from 'vitest';

import { mockValidCharacters, mockEmptyCharacters } from '../__tests__/characters';
import { fetchCharacters } from '../api/itemsApi';
import type { Character } from '../types';

import { SearchSection } from './SearchSection';

vi.mock('../api/itemsApi', () => ({
  fetchCharacters: vi.fn(),
}));

vi.mock('./ResultsList', () => ({
  ResultsList: ({ characters }: { characters: Character[] }) => (
    <div data-testid="results-list">{JSON.stringify(characters)}</div>
  ),
}));

describe('SearchSection', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('shows loader while loading', () => {
    (fetchCharacters as Mock).mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <SearchSection />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows characters after search', async () => {
    (fetchCharacters as Mock).mockResolvedValue({
      characters: mockValidCharacters,
      totalPages: 1,
      currentPage: 1,
    });

    render(
      <MemoryRouter>
        <SearchSection />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rick' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('results-list')).toHaveTextContent('Rick Sanchez');
    });
  });

  test('shows no characters if response is empty', async () => {
    (fetchCharacters as Mock).mockResolvedValue({
      characters: mockEmptyCharacters,
      totalPages: 0,
      currentPage: 1,
    });

    render(
      <MemoryRouter>
        <SearchSection />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Nobody' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('results-list')).toHaveTextContent('[]');
    });
  });

  test('shows error message on failure', async () => {
    (fetchCharacters as Mock).mockRejectedValue(new Error('Network error'));

    render(
      <MemoryRouter>
        <SearchSection />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
