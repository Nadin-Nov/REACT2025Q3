import type { FC } from 'react';

import styles from './PasswordStrengthIndicator.module.css';

type Props = {
  strength: string;
};

export const PasswordStrengthIndicator: FC<Props> = ({ strength }) => {
  return (
    <div className={styles.container}>
      Strength:{' '}
      <span className={styles[strength.toLowerCase()]}>{strength}</span>
    </div>
  );
};
