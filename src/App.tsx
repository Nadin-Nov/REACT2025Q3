import type { FC, ChangeEvent } from 'react';
import React, { Suspense, useState, useMemo, useCallback } from 'react';

import styles from './App.module.css';
import CountryControls from './components/CountryControls/CountryControls';
import CountryTable from './components/CountryTable/CountryTable';
import Spinner from './components/Spinner/Spinner';
import YearSelector from './components/YearSelector/YearSelector';
import { co2Resource } from './services/co2Resource';
import type { Co2Dataset } from './types/co2';
import { getAllYears, getCountriesArray } from './utils/data';

const App: FC = () => {
  const dataset: Co2Dataset = co2Resource.read();

  const countries = useMemo(() => getCountriesArray(dataset), [dataset]);
  const allYears = useMemo(() => getAllYears(dataset), [dataset]);

  const [selectedYear, setSelectedYear] = useState<number>(
    allYears[allYears.length - 1]
  );

  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleYearChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleSortByChange = useCallback((value: 'name' | 'population') => {
    setSortBy(value);
  }, []);

  const handleSortOrderChange = useCallback((value: 'asc' | 'desc') => {
    setSortOrder(value);
  }, []);

  const filteredSortedCountries = useMemo(() => {
    let result = countries;

    if (search.trim() !== '') {
      const lowerSearch = search.toLowerCase();
      result = result.filter(([name]) =>
        name.toLowerCase().includes(lowerSearch)
      );
    }

    result = [...result].sort(([nameA, countryA], [nameB, countryB]) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortBy === 'population') {
        const yearDataA = countryA.data.find((d) => d.year === selectedYear);
        const yearDataB = countryB.data.find((d) => d.year === selectedYear);

        const popA = yearDataA?.population ?? 0;
        const popB = yearDataB?.population ?? 0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }

      return 0;
    });

    return result;
  }, [countries, search, sortBy, sortOrder, selectedYear]);

  return (
    <div className={styles.container}>
      <h1>CO₂ Explorer</h1>

      <YearSelector
        allYears={allYears}
        selectedYear={selectedYear}
        onChange={handleYearChange}
      />

      <CountryControls
        search={search}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={handleSortByChange}
        onSortOrderChange={handleSortOrderChange}
      />

      <Suspense fallback={<Spinner fullscreen={false} />}>
        <MemoizedCountryTable
          countries={filteredSortedCountries}
          selectedYear={selectedYear}
        />
      </Suspense>
    </div>
  );
};

const MemoizedCountryTable = React.memo(CountryTable);

export default App;
