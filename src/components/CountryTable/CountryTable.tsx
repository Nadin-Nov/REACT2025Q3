import clsx from 'clsx';
import type { FC } from 'react';
import { useState, useEffect } from 'react';

import type { Co2Dataset } from '../../types/co2';

import styles from './CountryTable.module.css';

type Props = {
  countries: [string, Co2Dataset[string]][];
  selectedYear: number;
};

const formatValue = (value: number | undefined) =>
  value !== undefined ? value.toLocaleString() : 'N/A';

const CountryTable: FC<Props> = ({ countries, selectedYear }) => {
  const [highlightedYear, setHighlightedYear] = useState<number | null>(null);

  useEffect(() => {
    setHighlightedYear(selectedYear);
    const timer = setTimeout(() => setHighlightedYear(null), 500);
    return () => clearTimeout(timer);
  }, [selectedYear]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Country</th>
          <th>Population</th>
          <th>CO₂</th>
          <th>CO₂ per capita</th>
        </tr>
      </thead>
      <tbody>
        {countries.map(([name, country]) => {
          const yearData = country.data.find((d) => d.year === selectedYear);
          const latest = country.data[country.data.length - 1];
          return (
            <tr
              key={name}
              className={clsx(
                highlightedYear === selectedYear && styles.highlighted
              )}
            >
              <td>
                {name}
                {country.iso_code ? ` (${country.iso_code})` : ''}
              </td>
              <td>{formatValue(yearData?.population ?? latest?.population)}</td>
              <td>{formatValue(yearData?.co2 ?? latest?.co2)}</td>
              <td>
                {formatValue(
                  yearData?.co2_per_capita ?? latest?.co2_per_capita
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CountryTable;
