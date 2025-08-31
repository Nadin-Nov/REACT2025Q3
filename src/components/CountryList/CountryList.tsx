import type { FC } from 'react';

import type { Co2Dataset } from '../../types/co2';
import CountryCard from '../CountryCard/CountryCard';

import styles from './CountryList.module.css';

type Props = {
  countries: [string, Co2Dataset[string]][];
  selectedYear: number;
};

const CountryList: FC<Props> = ({ countries, selectedYear }) => (
  <ul className={styles.list}>
    {countries.map(([name, country]) => (
      <CountryCard
        key={name}
        name={name}
        country={country}
        selectedYear={selectedYear}
      />
    ))}
  </ul>
);

export default CountryList;
