import clsx from 'clsx';
import type { FC } from 'react';
import { useState, useEffect } from 'react';

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
  const currentYearData: YearlyData | undefined = country.data.find(
    (d) => d.year === selectedYear
  );

  const latest: YearlyData | undefined = country.data[country.data.length - 1];

  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (!currentYearData) return;
    setIsHighlighted(true);
    const timer = setTimeout(() => setIsHighlighted(false), 500);
    return () => clearTimeout(timer);
  }, [selectedYear, currentYearData]);

  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <strong>{name}</strong> —{' '}
        {formatValue(currentYearData?.population ?? latest?.population)} people
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
          {currentYearData ? (
            <tr className={clsx(isHighlighted && styles.highlighted)}>
              <td>{currentYearData.year}</td>
              <td>{formatValue(currentYearData.population)}</td>
              <td>{formatValue(currentYearData.co2)}</td>
              <td>{formatValue(currentYearData.co2_per_capita)}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan={4}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </li>
  );
};

export default CountryCard;
