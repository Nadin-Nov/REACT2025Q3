import type { FC, ChangeEvent, FormEvent } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: VoidFunction;
};

export const SearchBar: FC<Props> = ({ value, onChange, onSearch }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
      data-testid="search-bar"
    >
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
};
