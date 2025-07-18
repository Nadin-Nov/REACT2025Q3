import type { ChangeEvent, FormEventHandler } from 'react';
import { Component } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: VoidFunction;
};

export default class SearchBar extends Component<Props> {
  handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    this.props.onSearch();
  };

  render() {
    const { value, onChange } = this.props;

    return (
      <form className="search-bar" onSubmit={this.handleSubmit} data-testid="search-bar">
        <input
          type="text"
          placeholder="Type a name…"
          className="search-input"
          value={value}
          onChange={onChange}
        />
        <button type="submit" className="search-button">
          Search!
        </button>
      </form>
    );
  }
}
