import type { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { ResultsList } from '../components/ResultsList';
import { SearchBar } from '../components/SearchBar';
import { useCharacters } from '../hooks/useCharacters';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const SearchSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', query || '');

  const { characters, loading, error, totalPages } = useCharacters(query, page);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = searchTerm.trim();
    setSearchParams({ query: trimmed, page: '1' });
  };

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ query, page: String(newPage) });
  };

  return (
    <div className="search-section">
      <SearchBar value={searchTerm} onChange={handleInputChange} onSearch={handleSearchClick} />
      <main>
        {loading ? (
          <Loader />
        ) : error ? (
          <p style={{ color: 'white' }}>Error: {error}</p>
        ) : (
          <>
            <ResultsList characters={characters} currentPage={page} />
            {characters.length > 0 && (
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={goToPage} />
            )}
          </>
        )}
      </main>
    </div>
  );
};
