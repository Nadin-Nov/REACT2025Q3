import { describe, it, expect, vi, afterEach } from 'vitest';

import {
  mockValidApiResponse,
  mockEmptyApiResponse,
} from '../__tests__/apiResponses';
import { mockValidCharacters, mockEmptyCharacters } from '../__tests__/characters';
import type { FetchCharactersResult, Character } from '../types';

import * as rickAndMortyApi from './itemsApi';

vi.mock('./itemsApi', () => ({
  fetchCharacters: vi.fn((searchTerm: string, page?: number): Promise<FetchCharactersResult> => {
    const currentPage = page ?? 1;

    if (searchTerm === 'invalid') {
      return Promise.reject(new Error('Invalid API response structure'));
    }
    if (searchTerm === 'empty') {
      return Promise.resolve({
        characters: mockEmptyCharacters,
        totalPages: mockEmptyApiResponse.info.pages,
        currentPage,
      });
    }
    return Promise.resolve({
      characters: mockValidCharacters,
      totalPages: mockValidApiResponse.info.pages,
      currentPage,
    });
  }),
  fetchCharacterById: vi.fn((id: number): Promise<Character> => {
    if (id === -1) {
      return Promise.reject(new Error('API error: 404 Not Found'));
    }
    return Promise.resolve(mockValidCharacters[0]);
  }),
}));

describe('fetchCharacters', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it('should fetch and map characters correctly', async () => {
    const result: FetchCharactersResult = await rickAndMortyApi.fetchCharacters('rick', 1);

    expect(result.characters).toEqual(mockValidCharacters);
    expect(result.totalPages).toBe(mockValidApiResponse.info.pages);
    expect(result.currentPage).toBe(1);
  });

  it('should return empty list and zero pages when no characters found', async () => {
    const result: FetchCharactersResult = await rickAndMortyApi.fetchCharacters('empty', 1);

    expect(result.characters).toEqual([]);
    expect(result.totalPages).toBe(0);
    expect(result.currentPage).toBe(1);
  });

  it('should throw error on invalid API response structure', async () => {
    await expect(rickAndMortyApi.fetchCharacters('invalid', 1)).rejects.toThrow(
      'Invalid API response structure'
    );
  });
});

describe('fetchCharacterById', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it('should return character data for valid id', async () => {
    const char: Character = await rickAndMortyApi.fetchCharacterById(1);
    expect(char).toEqual(mockValidCharacters[0]);
  });

  it('should throw error for invalid id', async () => {
    await expect(rickAndMortyApi.fetchCharacterById(-1)).rejects.toThrow(
      'API error: 404 Not Found'
    );
  });
});
