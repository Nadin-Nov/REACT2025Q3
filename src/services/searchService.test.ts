import SearchService from './searchService';

describe('SearchService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('getSavedSearchTerm returns saved term from localStorage', () => {
    localStorage.setItem('searchTerm', 'Rick');
    expect(SearchService.getSavedSearchTerm()).toBe('Rick');
  });

  test('getSavedSearchTerm returns empty string if nothing saved', () => {
    expect(SearchService.getSavedSearchTerm()).toBe('');
  });

  test('saveSearchTerm saves term to localStorage', () => {
    SearchService.saveSearchTerm('Morty');
    expect(localStorage.getItem('searchTerm')).toBe('Morty');
  });
});
