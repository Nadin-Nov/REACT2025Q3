import { Component } from 'react';

import type { Character } from '../types';

import ResultCard from './ResultCard';

type Props = {
  characters: Character[];
};

export default class ResultList extends Component<Props> {
  render() {
    const { characters } = this.props;

    if (characters.length === 0) {
      return (
        <div
          className="no-results"
          style={{ padding: '20px', textAlign: 'center' }}
        >
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
            name={char.name}
            description={char.description}
            image={char.image}
          />
        ))}
      </div>
    );
  }
}
