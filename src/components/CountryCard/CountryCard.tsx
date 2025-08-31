import clsx from 'clsx';
import type { FC } from 'react';

import type { CountryData, YearlyData } from '../../types/co2';

import styles from './CountryCard.module.css';

type Props = {
  name: string;
  country: CountryData;
  selectedYear: number;
};

const formatValue = (value: number | undefined) =>
  value !== undefined ? value.toLocaleString() : 'N/A';

const CountryCard: FC<Props> = ({ name, country, selectedYear }) => {
  const latest: YearlyData | undefined = country.data[country.data.length - 1];

  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <strong>{name}</strong> — {formatValue(latest?.population)} people
        {country.iso_code && <span> ({country.iso_code})</span>}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Population</th>
            <th>CO₂</th>
            <th>CO₂ per capita</th>
          </tr>
        </thead>
        <tbody>
          {country.data.map((yearData) => (
            <tr
              key={yearData.year}
              className={clsx(
                yearData.year === selectedYear && styles.highlighted
              )}
            >
              <td>{yearData.year}</td>
              <td>{formatValue(yearData.population)}</td>
              <td>{formatValue(yearData.co2)}</td>
              <td>{formatValue(yearData.co2_per_capita)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </li>
  );
};

export default CountryCard;
