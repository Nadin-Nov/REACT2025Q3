import { fetchCharacterById } from '../api/itemsApi';

const STORAGE_KEY = 'searchTerm';

export const searchService = {
  getSavedSearchTerm(): string {
    const term = localStorage.getItem(STORAGE_KEY);
    return term ?? '';
  },
  saveSearchTerm(term: string): void {
    localStorage.setItem(STORAGE_KEY, term);
  },

  getCharacterById(id: number) {
    return fetchCharacterById(id);
  },
};
