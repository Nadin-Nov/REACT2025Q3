import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { ResultsList } from '../components/ResultsList';
import { useCharacters } from '../hooks/useCharacters';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { Flyout } from './Flyout/Flyout';
import { SearchBar } from './SearchBar/SearchBar';

type Props = {
  currentPage?: string;
};

function errorToString(error: unknown): string {
  if (!error) return '';
  if (typeof error === 'string') return error;
  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}

export const SearchSection = ({ currentPage }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryFromUrl = searchParams.get('query') ?? '';
  const page = parseInt(currentPage ?? '1', 10);

  const [searchTerm, setSearchTerm] = useState(queryFromUrl);

  const [, setSearchTermLS] = useLocalStorage('searchTerm', queryFromUrl);

  const { characters, loading, error, totalPages } = useCharacters(
    searchTerm,
    page
  );

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
      `/${newPage}${searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ''}`
    );
  };

  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);

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
          <p style={{ color: 'white' }}>Error: {errorToString(error)}</p>
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
      <Flyout />
    </div>
  );
};
