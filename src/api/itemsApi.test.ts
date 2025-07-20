import { mockValidApiResponse } from '../__tests__/apiResponses';

import ItemsApi from './itemsApi';

describe('ItemsApi.fetchCharacters', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and maps chracters', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockValidApiResponse),
      })
    ));

    const result = await ItemsApi.fetchCharacters('rick', 1);

    expect(result.characters.length).toBeGreaterThan(0);
    expect(result.totalPages).toBe(mockValidApiResponse.info.pages);
    expect(result.currentPage).toBe(1);
  });

});
