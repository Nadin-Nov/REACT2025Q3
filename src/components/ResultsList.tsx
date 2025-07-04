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
      return <p>No results found</p>;
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
