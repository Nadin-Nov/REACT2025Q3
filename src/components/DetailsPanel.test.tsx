import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';

import { mockValidCharacters } from '../__tests__/characters';
import * as api from '../api/itemsApi';
import type { Character } from '../types';

import { DetailsPanel } from './DetailsPanel';

describe('DetailsPanel', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should renders character details correctly', () => {
    const mockCharacter: Character = mockValidCharacters[0];

    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof api.useGetCharacterByIdQuery>);

    render(
      <MemoryRouter>
        <DetailsPanel />
      </MemoryRouter>
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);

    const statusParagraph = screen.getByText('Status:', {
      selector: 'strong',
    }).parentElement;
    expect(statusParagraph).toHaveTextContent(
      `Status: ${mockCharacter.description.split(' - ')[1]}`
    );

    const speciesParagraph = screen.getByText('Species:', {
      selector: 'strong',
    }).parentElement;
    expect(speciesParagraph).toHaveTextContent(
      `Species: ${mockCharacter.description.split(' - ')[0]}`
    );

    const originParagraph = screen.getByText('Origin:', {
      selector: 'strong',
    }).parentElement;
    expect(originParagraph).toHaveTextContent(
      `Origin: ${mockCharacter.description.split(' - ')[2].replace('from ', '')}`
    );
  });

  it('should show loader when loading', () => {
    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof api.useGetCharacterByIdQuery>);

    render(
      <MemoryRouter>
        <DetailsPanel />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should show error message on error', () => {
    const errorObj = { status: 'FETCH_ERROR' };

    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      error: errorObj,
      refetch: vi.fn(),
    } as ReturnType<typeof api.useGetCharacterByIdQuery>);

    render(
      <MemoryRouter>
        <DetailsPanel />
      </MemoryRouter>
    );

    expect(screen.getByText(/Network error/i)).toBeInTheDocument();
  });

  it('should shows "Character not found." if no data and no error', () => {
    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof api.useGetCharacterByIdQuery>);

    render(
      <MemoryRouter>
        <DetailsPanel />
      </MemoryRouter>
    );

    expect(screen.getByText(/Character not found/i)).toBeInTheDocument();
  });
});
