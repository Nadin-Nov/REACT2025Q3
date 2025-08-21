import type { FC } from 'react';
import type { z } from 'zod';

import styles from '../../mainPage.module.css';
import type { formSchema } from '../formConfig';

type FormTilesProps = {
  data: z.infer<typeof formSchema>[];
};

export const FormTiles: FC<FormTilesProps> = ({ data }) => (
  <div className={styles.tilesContainer}>
    <div className={styles.tiles}>
      {data.map((item, idx) => (
        <div
          key={idx}
          className={`${styles.tile} ${idx === data.length - 1 ? styles.newTile : ''}`}
        >
          <strong>{item.name}</strong>
          <p>{item.email}</p>
          {item.country && <p>{item.country}</p>}
          {item.age !== undefined && <p>Age: {item.age}</p>}
        </div>
      ))}
    </div>
  </div>
);
