import type { FC } from 'react';

import type { Character } from '../types';

import { ResultCard } from './ResultCard/ResultCard';

type Props = {
  characters: Character[];
  currentPage: number;
};

export const ResultsList: FC<Props> = ({ characters, currentPage }) => {
  if (characters.length === 0) {
    return (
      <div className="no-results">
        <h3>Uh oh! Nobody here…</h3>
        <p>Maybe they’re hiding in some crazy alternate dimension!</p>
        <p>
          Or Rick broke the multiverse again. Try searching for another
          character!
        </p>
      </div>
    );
  }

  return (
    <div className="result-list">
      {characters.map((char) => (
        <ResultCard
          key={char.id}
          id={char.id}
          name={char.name}
          description={char.description}
          image={char.image}
          currentPage={currentPage}
        />
      ))}
    </div>
  );
};
