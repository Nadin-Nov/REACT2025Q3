import { useEffect, useState, type ChangeEvent } from 'react';

import ItemsApi from '../api/itemsApi';
import { Loader } from '../components/Loader';
import { ResultsList } from '../components/ResultsList';
import { SearchBar } from '../components/SearchBar';
import searchService from '../services/searchService';
import type { Character } from '../types';

export const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedTerm = searchService.getSavedSearchTerm();
    setSearchTerm(savedTerm);
    loadCharacters(savedTerm).catch(console.error);
  }, []);

  const loadCharacters = async (term: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await ItemsApi.fetchCharacters(term, 1);
      setCharacters(result.characters);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmedTerm = searchTerm.trim();
    searchService.saveSearchTerm(trimmedTerm);
    loadCharacters(trimmedTerm).catch(console.error);
  };

  return (
    <div className="search-section">
      <SearchBar
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearchClick}
      />

      <main>
        {loading ? (
          <Loader />
        ) : error ? (
          <p style={{ color: 'white' }}>Error: {error}</p>
        ) : (
          <ResultsList characters={characters} />
        )}
      </main>
    </div>
  );
};
