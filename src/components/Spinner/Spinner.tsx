import type { FC } from 'react';

import styles from './Spinner.module.css';

type Props = {
  fullscreen?: boolean;
};

const Spinner: FC<Props> = ({ fullscreen = false }) => {
  if (fullscreen) {
    return (
      <div className={styles.fullscreen}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return <div className={styles.loader}></div>;
};

export default Spinner;
