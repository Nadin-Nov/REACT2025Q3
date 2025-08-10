import { useDispatch } from 'react-redux';

import { itemsApi } from '../../api/itemsApi';

import styles from './RefreshButton.module.css';

export function RefreshButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(itemsApi.util.invalidateTags(['Characters', 'Character']));
  };

  return (
    <button
      className={styles.refreshButton}
      type="button"
      onClick={handleClick}
    >
      Refresh
    </button>
  );
}
