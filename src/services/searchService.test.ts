import { searchService } from './searchService';

describe('SearchService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('getSavedSearchTerm returns saved term from localStorage', () => {
    localStorage.setItem('searchTerm', 'Rick');
    expect(searchService.getSavedSearchTerm()).toBe('Rick');
  });

  test('getSavedSearchTerm returns empty string if nothing saved', () => {
    expect(searchService.getSavedSearchTerm()).toBe('');
  });

  test('saveSearchTerm saves term to localStorage', () => {
    searchService.saveSearchTerm('Morty');
    expect(localStorage.getItem('searchTerm')).toBe('Morty');
  });
});
