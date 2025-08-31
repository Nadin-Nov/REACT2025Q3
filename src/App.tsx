import type { FC, ChangeEvent } from 'react';
import { Suspense, useState, useMemo } from 'react';

import styles from './App.module.css';
import CountryTable from './components/CountryTable/CountryTable';
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

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  return (
    <div className={styles.container}>
      <h1>CO₂ Explorer</h1>

      <YearSelector
        allYears={allYears}
        selectedYear={selectedYear}
        onChange={handleYearChange}
      />

      <Suspense fallback={<p>Loading CO₂ data…</p>}>
        <CountryTable countries={countries} selectedYear={selectedYear} />
      </Suspense>
    </div>
  );
};

export default App;
