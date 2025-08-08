import clsx from 'clsx';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../store';
import { unselectAll } from '../../store/selectedItemsSlice';

import styles from './Flyout.module.css';

export const Flyout: FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  if (selectedItems.length === 0) return null;

  const handleDownloadClick = () => {};

  return (
    <div
      className={styles.flyout}
      role="region"
      aria-live="polite"
      aria-label="Selected items actions"
    >
      <span className={styles.text}>
        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
        selected
      </span>
      <div className={styles.buttons}>
        <button
          type="button"
          className={clsx(styles.button, styles.unselectButton)}
          onClick={() => dispatch(unselectAll())}
        >
          Unselect all
        </button>
        <button
          type="button"
          className={clsx(styles.button, styles.downloadButton)}
          onClick={handleDownloadClick}
        >
          Download
        </button>
      </div>
    </div>
  );
};
