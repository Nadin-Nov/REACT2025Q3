import type { FC } from 'react';

import styles from '../../mainPage.module.css';

export type FormTileData = {
  name: string;
  email: string;
  age: number;
  gender: string;
  country: string;
  acceptTnC: boolean;
  picture?: string;
};

export type FormTilesProps = {
  data: FormTileData[];
};

export const FormTiles: FC<FormTilesProps> = ({ data }) => (
  <div className={styles.tilesContainer}>
    <div className={styles.tiles}>
      {data.map((item, idx) => (
        <div
          key={idx}
          className={`${styles.tile} ${
            idx === data.length - 1 ? styles.newTile : ''
          }`}
        >
          <strong>{item.name}</strong>
          <p>Email: {item.email}</p>
          <p>Age: {item.age}</p>
          <p>Gender: {item.gender}</p>
          <p>Country: {item.country}</p>
          <p>Accepted T&C: {item.acceptTnC ? 'Yes' : 'No'}</p>
          {item.picture && <img src={item.picture} alt={item.name} />}
        </div>
      ))}
    </div>
  </div>
);
