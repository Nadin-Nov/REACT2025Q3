import { afterEach, describe, expect, it, vi } from 'vitest';

import { mockValidApiResponse } from '../__tests__/apiResponses';

import { fetchCharacters } from './itemsApi';

describe('fetchCharacters', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should fetch and map characters correctly', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockValidApiResponse),
      })
    ));

    const result = await fetchCharacters('rick', 1);

    expect(result.characters.length).toBeGreaterThan(0);
    expect(result.totalPages).toBe(mockValidApiResponse.info.pages);
    expect(result.currentPage).toBe(1);
  });

  it('should return empty list and zero pages on 404 response', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    ));

    const result = await fetchCharacters('unknown', 1);

    expect(result.characters).toEqual([]);
    expect(result.totalPages).toBe(0);
    expect(result.currentPage).toBe(1);
  });

  it('should throw error on non-404 failed response', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    ));

    await expect(fetchCharacters('rick', 1)).rejects.toThrow('API error: 500 Internal Server Error');
  });

  it('should throw error if API response structure is invalid', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ invalid: 'data' }),
      })
    ));

    await expect(fetchCharacters('rick', 1)).rejects.toThrow('Invalid API response structure');
  });
});
