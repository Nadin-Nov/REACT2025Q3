import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect, afterEach } from 'vitest';

import * as api from '../api/itemsApi';

import { DetailsPanel } from './DetailsPanel';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('DetailsPanel', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    description: 'Human - Alive - from Earth',
    image: 'rick.png',
  };

  afterEach(() => {
    vi.restoreAllMocks();
    mockNavigate.mockClear();
  });

  it('should show loader while fetching character', () => {
    vi.spyOn(api, 'fetchCharacterById').mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/1/1']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<DetailsPanel />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display character data after fetch', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/1/1']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<DetailsPanel />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        mockCharacter.name
      )
    );
    expect(screen.getByAltText(mockCharacter.name)).toHaveAttribute(
      'src',
      mockCharacter.image
    );
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });

  it('should display error if fetchCharacterById throws', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockRejectedValue(
      new Error('Fetch error')
    );

    render(
      <MemoryRouter initialEntries={['/1/1']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<DetailsPanel />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/error/i)).toHaveTextContent('Fetch error')
    );
  });

  it('should display error on invalid detailsId', async () => {
    render(
      <MemoryRouter initialEntries={['/1/abc']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<DetailsPanel />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/invalid character id/i)
    ).toBeInTheDocument();
  });

  it('should navigate to list view on close button click', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/1/1?query=rick']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<DetailsPanel />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByRole('heading', { level: 2 }));

    const closeButton = screen.getByRole('button', { name: /✖/ });
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/1',
      search: 'query=rick',
    });
  });
});
