import type { ChangeEvent } from 'react';
import { Component } from 'react';

import ItemsApi from '../api/itemsApi';
import {Loader} from '../components/Loader';
import {ResultsList} from '../components/ResultsList';
import {SearchBar} from '../components/SearchBar';
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
        <SearchBar
          value={searchTerm}
          onChange={this.handleInputChange}
          onSearch={this.handleSearchClick}
        />

        <main>
          {loading ? (
            <Loader />
          ) : error ? (
            <p style={{ color: 'white' }}>Error: {error}</p>
          ) : (
            <ResultsList characters={characters} />
          )}
        </main>
      </div>
    );
  }
}
