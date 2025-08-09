import type { FC, ChangeEvent, FormEvent } from 'react';

import styles from '../SearchBar/SearchBar.module.css';

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
      className={styles['search-bar']}
      onSubmit={handleSubmit}
      data-testid="search-bar"
    >
      <input
        type="search"
        placeholder="Type a name…"
        className={styles['search-input']}
        value={value}
        onChange={onChange}
        aria-label="Search characters"
      />
      <button type="submit" className={styles['search-button']}>
        Search!
      </button>
    </form>
  );
};
