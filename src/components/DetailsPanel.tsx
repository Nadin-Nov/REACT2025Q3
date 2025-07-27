import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchCharacterById } from '../api/itemsApi';
import type { Character } from '../types';

import { Loader } from './Loader';

export const DetailsPanel = () => {
  const { detailsId } = useParams<{ detailsId: string }>();
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
    navigate('/');
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
