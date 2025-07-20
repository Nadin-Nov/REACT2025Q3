import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import ItemsApi from '../api/itemsApi';
import SearchSection from '../components/SearchSection';
import { mockValidCharacters, mockEmptyCharacters } from '../mocks/characters';

vi.mock('../api/itemsApi');

describe('SearchSection', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('shows loader while loading', () => {
    vi.spyOn(ItemsApi, 'fetchCharacters').mockImplementation(() => new Promise(() => {}));

    render(<SearchSection />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows characters after search', async () => {
    vi.spyOn(ItemsApi, 'fetchCharacters').mockResolvedValue({
      characters: mockValidCharacters,
      totalPages: 1,
      currentPage: 1,
    });

    render(<SearchSection />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rick' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  test('shows no characters if response is empty', async () => {
    vi.spyOn(ItemsApi, 'fetchCharacters').mockResolvedValue({
      characters: mockEmptyCharacters,
      totalPages: 0,
      currentPage: 1,
    });

    render(<SearchSection />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Nobody' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
  });

  test('shows error message on failure', async () => {
    vi.spyOn(ItemsApi, 'fetchCharacters').mockRejectedValue(new Error('Network error'));

    render(<SearchSection />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
