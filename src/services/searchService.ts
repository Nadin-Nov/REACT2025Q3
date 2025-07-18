export default class SearchService {
  private static STORAGE_KEY = 'searchTerm';
  static getSavedSearchTerm(): string {
    const term = localStorage.getItem(SearchService.STORAGE_KEY);
    return term ?? '';
  }
  static saveSearchTerm(term: string): void {
    localStorage.setItem(SearchService.STORAGE_KEY, term);
  }
}
