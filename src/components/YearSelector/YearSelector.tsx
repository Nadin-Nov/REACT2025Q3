import type { FC, ChangeEvent } from 'react';
import React from 'react';

import styles from './YearSelector.module.css';

type Props = {
  allYears: number[];
  selectedYear: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const YearSelector: FC<Props> = ({ allYears, selectedYear, onChange }) => (
  <div className={styles.controls}>
    <label htmlFor="yearSelect">Select Year: </label>
    <select id="yearSelect" value={selectedYear} onChange={onChange}>
      {allYears.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
);

export default React.memo(YearSelector);
