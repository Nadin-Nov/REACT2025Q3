import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  expect,
  vi,
  describe,
  beforeEach,
  afterEach,
  test,
  type Mock,
} from 'vitest';

import {
  mockValidCharacters,
  mockEmptyCharacters,
} from '../__tests__/characters';
import { useGetCharactersQuery } from '../api/itemsApi';
import { renderWithProviders } from '../test-utils/renderWithProviders';
import type { Character } from '../types';

import { SearchSection } from './SearchSection';

vi.mock('../api/itemsApi', () => ({
  useGetCharactersQuery: vi.fn(),
}));

vi.mock('./ResultsList', () => ({
  ResultsList: ({ characters }: { characters: Character[] }) => (
    <div data-testid="results-list">{JSON.stringify(characters)}</div>
  ),
}));

describe('SearchSection', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('should show loader while loading', () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    renderWithProviders(<SearchSection />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('should show characters after search', async () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: {
        characters: mockValidCharacters,
        totalPages: 1,
        currentPage: 1,
      },
      error: undefined,
      isLoading: false,
    });

    renderWithProviders(<SearchSection />);

    const input = screen.getByRole('searchbox');
    await user.clear(input);
    await user.type(input, 'Rick');

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('results-list')).toHaveTextContent(
        'Rick Sanchez'
      );
    });
  });

  test('should show no characters if response is empty', async () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: {
        characters: mockEmptyCharacters,
        totalPages: 0,
        currentPage: 1,
      },
      error: undefined,
      isLoading: false,
    });

    renderWithProviders(<SearchSection />);

    const input = screen.getByRole('searchbox');
    await user.clear(input);
    await user.type(input, 'Nobody');

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('results-list')).toHaveTextContent('[]');
    });
  });

  test('should show error message on failure', async () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: undefined,
      error: { status: 500, data: 'Network error' },
      isLoading: false,
    });

    renderWithProviders(<SearchSection />);

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
