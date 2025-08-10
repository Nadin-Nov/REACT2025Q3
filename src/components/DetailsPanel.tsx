import { skipToken } from '@reduxjs/toolkit/query/react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import { useGetCharacterByIdQuery } from '../api/itemsApi';

import styles from './DetailsPanel.module.css';
import { Loader } from './Loader';

function getErrorMessage(error: unknown): string {
  if (error === null || error === undefined) return 'Failed to load character';

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object') {
    if ('status' in error) {
      const e = error as { status?: number | string };
      if (typeof e.status === 'number') return `Error ${e.status}`;
      if (e.status === 'FETCH_ERROR') return 'Network error';
      if (e.status === 'PARSING_ERROR') return 'Response parsing error';
      return 'Unknown error';
    }
    if ('message' in error) {
      const e = error as { message?: unknown };
      if (typeof e.message === 'string') return e.message;
    }

    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return 'Unknown error object';
    }
  }

  if (typeof error === 'number' || typeof error === 'boolean') {
    return error.toString();
  }

  return 'Unknown error type';
}

export const DetailsPanel = () => {
  const { detailsId, page: routePage } = useParams<{
    detailsId?: string;
    page?: string;
  }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = detailsId ? Number(detailsId) : NaN;

  const {
    data: character,
    isLoading,
    error,
    refetch,
  } = useGetCharacterByIdQuery(isNaN(id) ? skipToken : id);

  const handleClose = () => {
    const currentPageFromParams = searchParams.get('page');
    const fallbackPage = routePage || currentPageFromParams || '1';
    const query = searchParams.get('query') || '';

    const newSearchParams = new URLSearchParams();
    if (query) newSearchParams.set('query', query);

    void navigate({
      pathname: `/${fallbackPage}`,
      search: newSearchParams.toString(),
    });
  };

  const handleRefresh = () => {
    void refetch();
  };

  if (isLoading) return <Loader />;

  if (error)
    return <p style={{ color: 'red' }}>Error: {getErrorMessage(error)}</p>;

  if (!character) return <p>Character not found.</p>;

  return (
    <div className={styles.detailsPanel}>
      <button onClick={handleClose} className={styles.closeButton}>
        ✖
      </button>

      <button
        onClick={handleRefresh}
        type="button"
        className={styles.refreshButton}
      >
        Refresh Details
      </button>

      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>
        <strong>Status:</strong> {character.description.split(' - ')[1]}
      </p>
      <p>
        <strong>Species:</strong> {character.description.split(' - ')[0]}
      </p>
      <p>
        <strong>Origin:</strong>{' '}
        {character.description.split(' - ')[2].replace('from ', '')}
      </p>
    </div>
  );
};
