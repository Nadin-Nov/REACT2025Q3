import type { FC, ChangeEvent } from 'react';

import styles from './CountryControls.module.css';

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onSortByChange: (value: 'name' | 'population') => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
};

const CountryControls: FC<Props> = ({
  search,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortByChange(e.target.value as 'name' | 'population');
  };

  const handleSortOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortOrderChange(e.target.value as 'asc' | 'desc');
  };

  return (
    <div className={styles.controls}>
      <input
        type="text"
        placeholder="Search by country name"
        value={search}
        onChange={handleSearch}
        className={styles.search}
      />

      <select value={sortBy} onChange={handleSortBy}>
        <option value="name">Sort by name</option>
        <option value="population">Sort by population</option>
      </select>

      <select value={sortOrder} onChange={handleSortOrder}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default CountryControls;
