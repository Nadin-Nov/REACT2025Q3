import type { ChangeEvent, MouseEventHandler } from 'react';
import { Component } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: MouseEventHandler<HTMLButtonElement>;
  onEnter: () => void;
};

export default class SearchBar extends Component<Props> {
  render() {
    const { value, onChange, onSearch, onEnter } = this.props;

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type a name…"
          className="search-input"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnter();
            }
          }}
        />
        <button className="search-button" onClick={onSearch}>
          Search!
        </button>
      </div>
    );
  }
}
