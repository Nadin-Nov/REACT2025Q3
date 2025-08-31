import clsx from 'clsx';
import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { FixedSizeList, type ListChildComponentProps } from 'react-window';

import type { Co2Dataset, YearlyData } from '../../types/co2';

import styles from './CountryTable.module.css';

type Props = {
  countries: [string, Co2Dataset[string]][];
  selectedYear: number;
  height?: number;
  rowHeight?: number;
};

type CellKey = 'name' | 'year' | 'population' | 'co2' | 'co2_per_capita';

const formatValue = (value: number | undefined) =>
  value !== undefined ? value.toLocaleString() : 'N/A';

const CountryTable: FC<Props> = ({
  countries,
  selectedYear,
  height = 600,
  rowHeight = 40,
}) => {
  const prevYearValuesRef = useRef<Record<string, YearlyData>>({});
  const [highlightedCells, setHighlightedCells] = useState<
    Record<string, CellKey[]>
  >({});

  useEffect(() => {
    const newHighlights: Record<string, CellKey[]> = {};

    countries.forEach(([name, country]) => {
      const yearData = country.data.find((d) => d.year === selectedYear);
      const latest = country.data[country.data.length - 1];
      const prev = prevYearValuesRef.current[name] ?? {};
      const curr = yearData ?? latest;

      const keys: CellKey[] = (
        ['year', 'population', 'co2', 'co2_per_capita'] as CellKey[]
      ).filter((key) => prev[key] !== undefined && prev[key] !== curr[key]);

      if (keys.length) newHighlights[name] = keys;
    });

    prevYearValuesRef.current = Object.fromEntries(
      countries.map(([name, country]) => {
        const yearData = country.data.find((d) => d.year === selectedYear);
        return [name, yearData ?? country.data[country.data.length - 1]];
      })
    );

    setHighlightedCells(newHighlights);

    const timeout = setTimeout(() => setHighlightedCells({}), 2500);
    return () => clearTimeout(timeout);
  }, [selectedYear, countries]);

  const columnFlex: Record<CellKey, number> = {
    name: 2,
    year: 1,
    population: 1,
    co2: 1,
    co2_per_capita: 1,
  };

  const Row: FC<ListChildComponentProps> = ({ index, style }) => {
    const [name, country] = countries[index];
    const yearData = country.data.find((d) => d.year === selectedYear);
    const latest = country.data[country.data.length - 1];

    const cells: { value?: number; key: CellKey }[] = [
      { value: undefined, key: 'name' },
      { value: yearData?.year, key: 'year' },
      { value: yearData?.population ?? latest?.population, key: 'population' },
      { value: yearData?.co2 ?? latest?.co2, key: 'co2' },
      {
        value: yearData?.co2_per_capita ?? latest?.co2_per_capita,
        key: 'co2_per_capita',
      },
    ];

    return (
      <div style={style} className={clsx(styles.row)}>
        {cells.map((cell, i) => {
          const highlight = highlightedCells[name]?.includes(cell.key) ?? false;
          return (
            <div
              key={i}
              className={clsx(styles.cell, highlight && styles.highlighted)}
              style={{ flex: columnFlex[cell.key] }}
            >
              {cell.key === 'name'
                ? name + (country.iso_code ? ` (${country.iso_code})` : '')
                : formatValue(cell.value)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <div className={styles.cell} style={{ flex: columnFlex['name'] }}>
          Country
        </div>
        <div className={styles.cell} style={{ flex: columnFlex['year'] }}>
          Year
        </div>
        <div className={styles.cell} style={{ flex: columnFlex['population'] }}>
          Population
        </div>
        <div className={styles.cell} style={{ flex: columnFlex['co2'] }}>
          CO₂
        </div>
        <div
          className={styles.cell}
          style={{ flex: columnFlex['co2_per_capita'] }}
        >
          CO₂ per capita
        </div>
      </div>

      <FixedSizeList
        height={height}
        itemCount={countries.length}
        itemSize={rowHeight}
        width="100%"
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default CountryTable;
