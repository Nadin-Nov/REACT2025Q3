import { useState, useEffect } from 'react';

import { fetchCharacters } from '../api/itemsApi';
import type { Character } from '../types';

export function useCharacters(searchTerm: string, page: number) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const term = searchTerm || '';

    setLoading(true);
    setError(null);

    fetchCharacters(term, page)
      .then(result => {
        setCharacters(result.characters);
        setTotalPages(result.totalPages || 1);
      })
      .catch(err => {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
        setCharacters([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [searchTerm, page]);

  return { characters, loading, error, totalPages };
}
