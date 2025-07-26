import { useState, useEffect } from 'react';

import { fetchCharacters } from '../api/itemsApi';
import type { Character } from '../types';

export function useCharacters(searchTerm: string, page: number) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm) {
      setCharacters([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetchCharacters(searchTerm, page)
      .then(result => setCharacters(result.characters))
      .catch(err => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      })
      .finally(() => setLoading(false));
  }, [searchTerm, page]);

  return { characters, loading, error };
}
