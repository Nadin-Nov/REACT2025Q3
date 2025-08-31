import type { FC } from 'react';

import type { CountryData } from '../../types/co2';

import styles from './CountryCard.module.css';

type Props = {
  name: string;
  country: CountryData;
};

const CountryCard: FC<Props> = ({ name, country }) => {
  const latest = country.data[country.data.length - 1];

  return (
    <li className={styles.card}>
      <strong>{name}</strong> — {latest?.population ?? 'N/A'} people
      {country.iso_code && <span> ({country.iso_code})</span>}
    </li>
  );
};

export default CountryCard;
