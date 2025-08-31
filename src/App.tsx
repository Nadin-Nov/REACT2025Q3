import type { FC, ChangeEvent } from 'react';
import { Suspense, useState, useMemo } from 'react';

import styles from './App.module.css';
import CountryList from './components/CountryList/CountryList';
import YearSelector from './components/YearSelector/YearSelector';
import { co2Resource } from './services/co2Resource';
import type { Co2Dataset } from './types/co2';

const App: FC = () => {
  const dataset: Co2Dataset = co2Resource.read();
  const countries = Object.entries(dataset).slice(0, 10);

  const allYears = useMemo(() => {
    const yearsSet = new Set<number>();
    Object.values(dataset).forEach((country) =>
      country.data.forEach((yearData) => yearsSet.add(yearData.year))
    );
    return Array.from(yearsSet).sort((a, b) => a - b);
  }, [dataset]);

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
        <CountryList countries={countries} selectedYear={selectedYear} />
      </Suspense>
    </div>
  );
};

export default App;
