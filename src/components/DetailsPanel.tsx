import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import { fetchCharacterById } from '../api/itemsApi';
import type { Character } from '../types';

import { Loader } from './Loader';

export const DetailsPanel = () => {
  const { detailsId, page: routePage } = useParams<{ detailsId?: string; page?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!detailsId) return;

    const id = Number(detailsId);
    if (isNaN(id)) {
      setError('Invalid character ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchCharacterById(id)
      .then((char) => {
        setCharacter(char);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setCharacter(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [detailsId]);

  const handleClose = () => {
    const currentPageFromParams = searchParams.get('page');
    const fallbackPage = routePage || currentPageFromParams || '1';
    const query = searchParams.get('query') || '';

    const newSearchParams = new URLSearchParams();
    if (query) newSearchParams.set('query', query);

    navigate({
      pathname: `/${fallbackPage}`,
      search: newSearchParams.toString(),
    });
  };

  if (loading) return <Loader />;

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  if (!character) return <p>Character not found.</p>;

  return (
    <div className="details-panel">
      <button onClick={handleClose} className="close-button">
        ✖
      </button>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p><strong>Status:</strong> {character.description.split(' - ')[1]}</p>
      <p><strong>Species:</strong> {character.description.split(' - ')[0]}</p>
      <p><strong>Origin:</strong> {character.description.split(' - ')[2].replace('from ', '')}</p>
    </div>
  );
};
