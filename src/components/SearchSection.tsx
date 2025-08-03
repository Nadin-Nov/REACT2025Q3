import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { ResultsList } from '../components/ResultsList';
import { SearchBar } from '../components/SearchBar';
import { useCharacters } from '../hooks/useCharacters';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  currentPage?: string;
};

export const SearchSection = ({ currentPage }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('query') ?? '';
  const page = parseInt(currentPage ?? '1', 10);

  const [, setSearchTermLS] = useLocalStorage('searchTerm', query);

  const [searchTerm, setSearchTerm] = useState(query);

  const { characters, loading, error, totalPages } = useCharacters(query, page);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = searchTerm.trim();
    setSearchTermLS(trimmed);
    void navigate(
      `/${1}${trimmed ? `?query=${encodeURIComponent(trimmed)}` : ''}`
    );
  };

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    void navigate(
      `/${newPage}${query ? `?query=${encodeURIComponent(query)}` : ''}`
    );
  };

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

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
          <>
            <ResultsList characters={characters} currentPage={page} />
            {characters.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};
