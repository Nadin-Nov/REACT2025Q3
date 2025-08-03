import { describe, it, expect, vi, afterEach } from 'vitest';

import {
  mockValidApiResponse,
  mockInvalidApiResponse,
} from '../__tests__/apiResponses';
import {
  mockValidCharacters,
  mockEmptyCharacters,
} from '../__tests__/characters';
import type { FetchCharactersResult, Character } from '../types';

import * as itemsApi from './itemsApi';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchCharacters', () => {
  it('should fetch and map characters correctly', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockValidApiResponse),
        } as Response)
      )
    );

    const result: FetchCharactersResult = await itemsApi.fetchCharacters(
      'rick',
      1
    );

    expect(result.characters).toEqual(mockValidCharacters);
    expect(result.totalPages).toBe(mockValidApiResponse.info.pages);
    expect(result.currentPage).toBe(1);
  });

  it('should return empty list and zero pages when 404 returned', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        } as Response)
      )
    );

    const result = await itemsApi.fetchCharacters('unknown', 1);

    expect(result.characters).toEqual(mockEmptyCharacters);
    expect(result.totalPages).toBe(0);
    expect(result.currentPage).toBe(1);
  });

  it('should throw error on other HTTP errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
        } as Response)
      )
    );

    await expect(itemsApi.fetchCharacters('rick', 1)).rejects.toThrow(
      'API error: 500 Internal Server Error'
    );
  });

  it('should throw error on invalid API response structure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockInvalidApiResponse),
        } as Response)
      )
    );

    await expect(itemsApi.fetchCharacters('rick', 1)).rejects.toThrow(
      'Invalid API response structure'
    );
  });
});

describe('fetchCharacterById', () => {
  it('should fetch and map character correctly', async () => {
    const mockCharacter = mockValidApiResponse.results[0];

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCharacter),
        } as Response)
      )
    );

    const character: Character = await itemsApi.fetchCharacterById(1);

    expect(character).toEqual(mockValidCharacters[0]);
  });

  it('should throw error on HTTP error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        } as Response)
      )
    );

    await expect(itemsApi.fetchCharacterById(999)).rejects.toThrow(
      'API error: 404 Not Found'
    );
  });

  it('should throw error on invalid API response structure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockInvalidApiResponse),
        } as Response)
      )
    );

    await expect(itemsApi.fetchCharacterById(1)).rejects.toThrow(
      'Invalid API response structure'
    );
  });
});
