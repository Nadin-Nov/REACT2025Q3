import type { ChangeEvent } from 'react';
import { Component } from 'react';

import ItemsApi from '../api/itemsApi';
import searchService from '../services/searchService';
import type { Character } from '../types';

type State = {
  searchTerm: string;
  characters: Character[];
  loading: boolean;
  error: string | null;
};

export default class SearchSection extends Component<
  Record<string, never>,
  State
> {
  state: State = {
    searchTerm: '',
    characters: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const savedTerm = searchService.getSavedSearchTerm();
    this.setState({ searchTerm: savedTerm });
    this.loadCharacters(savedTerm).catch(console.error);
  }

  loadCharacters = async (term: string) => {
    this.setState({ loading: true, error: null });

    try {
      const result = await ItemsApi.fetchCharacters(term, 1);
      this.setState({ characters: result.characters, loading: false });
    } catch (error) {
      this.setState({ error: (error as Error).message, loading: false });
    }
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchClick = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    searchService.saveSearchTerm(trimmedTerm);
    this.loadCharacters(trimmedTerm).catch(console.error);
  };

  render() {
    const { searchTerm, characters, loading, error } = this.state;

    return (
      <div className="search-section">
        <header>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleInputChange}
            placeholder="Search characters..."
          />
          <button onClick={this.handleSearchClick}>Search</button>
        </header>

        <main>
          {loading && <p>Loading...</p>}

          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {!loading && !error && (
            <ul>
              {characters.map((char) => (
                <li key={char.id}>
                  <strong>{char.name}</strong>: {char.description}
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    );
  }
}
