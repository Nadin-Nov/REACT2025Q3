import type { FC } from 'react';

import styles from '../../mainPage.module.css';
import type { FormTilesProps } from '../../types';

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

          {item.picture && (
            <img
              src={item.picture}
              alt={item.name}
              style={{
                width: '100%',
                borderRadius: '8px',
                marginTop: '8px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);
