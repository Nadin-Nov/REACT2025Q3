import { describe, it, expect, vi, afterEach } from 'vitest';

import { mockValidApiResponse } from '../__tests__/apiResponses';
import { mockValidCharacters } from '../__tests__/characters';
import { store } from '../store';
import type { FetchCharactersResult, Character } from '../types';

import { itemsApi } from './itemsApi';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('itemsApi RTK Query endpoints', () => {
  describe('getCharacters', () => {
    it('should fetch and map characters successfully', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockValidApiResponse),
            text: () => Promise.resolve(JSON.stringify(mockValidApiResponse)),
            clone() {
              return this;
            },
          } as unknown as Response)
        )
      );

      const promise = store.dispatch(
        itemsApi.endpoints.getCharacters.initiate({
          searchTerm: 'rick',
          page: 1,
        })
      );

      const result: FetchCharactersResult = await promise.unwrap();

      expect(result.characters).toEqual(mockValidCharacters);
      expect(result.totalPages).toBe(mockValidApiResponse.info.pages);
      expect(result.currentPage).toBe(1);
    });

    it('should handle fetch error (e.g. 404) correctly', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: false,
            status: 404,
            statusText: 'Not Found',
            json: () => Promise.resolve({}),
            text: () => Promise.resolve(''),
            clone() {
              return this;
            },
          } as unknown as Response)
        )
      );

      const promise = store.dispatch(
        itemsApi.endpoints.getCharacters.initiate({
          searchTerm: 'unknown',
          page: 1,
        })
      );

      await expect(promise.unwrap()).rejects.toThrow();
    });
  });

  describe('getCharacterById', () => {
    it('should fetch and map character successfully', async () => {
      const mockCharacter = mockValidApiResponse.results[0];

      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockCharacter),
            text: () => Promise.resolve(JSON.stringify(mockCharacter)),
            clone() {
              return this;
            },
          } as unknown as Response)
        )
      );

      const promise = store.dispatch(
        itemsApi.endpoints.getCharacterById.initiate(1)
      );

      const result: Character = await promise.unwrap();

      expect(result).toEqual(mockValidCharacters[0]);
    });
  });
});
