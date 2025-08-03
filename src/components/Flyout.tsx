import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../store';
import { unselectAll } from '../store/selectedItemsSlice';

export const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  if (selectedItems.length === 0) return null;

  const handleDownloadClick = () => {};

  return (
    <div
      className="flyout"
      role="region"
      aria-live="polite"
      aria-label="Selected items actions"
    >
      <span>
        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
        selected
      </span>
      <div>
        <button type="button" onClick={() => dispatch(unselectAll())}>
          Unselect all
        </button>
        <button type="button" onClick={handleDownloadClick}>
          Download
        </button>
      </div>
    </div>
  );
};
