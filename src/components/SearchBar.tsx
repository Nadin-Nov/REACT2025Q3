import type { ChangeEvent, MouseEventHandler } from 'react';
import { Component } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: MouseEventHandler<HTMLButtonElement>;
};

export default class SearchBar extends Component<Props> {
  render() {
    const { value, onChange, onSearch } = this.props;

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type a name…"
          className="search-input"
          value={value}
          onChange={onChange}
        />
        <button className="search-button" onClick={onSearch}>
          Search!
        </button>
      </div>
    );
  }
}
