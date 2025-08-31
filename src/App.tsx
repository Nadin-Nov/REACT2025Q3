import type { FC } from 'react';
import { Suspense } from 'react';

import styles from './App.module.css';
import CountryCard from './components/CountryCard/CountryCard';
import { co2Resource } from './services/co2Resource';

const CountryList: FC = () => {
  const dataset = co2Resource.read();

  const countries = Object.entries(dataset).slice(0, 10);

  return (
    <ul className={styles.list}>
      {countries.map(([name, country]) => (
        <CountryCard key={name} name={name} country={country} />
      ))}
    </ul>
  );
};

const App: FC = () => {
  return (
    <div className={styles.container}>
      <h1>CO₂ Explorer</h1>
      <Suspense fallback={<p>Loading CO₂ data…</p>}>
        <CountryList />
      </Suspense>
    </div>
  );
};

export default App;
