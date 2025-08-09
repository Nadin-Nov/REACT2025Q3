import type { FC, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { RootState } from '../../store';
import { toggleSelect } from '../../store/selectedItemsSlice';

import styles from './ResultCard.module.css';

type Props = {
  id: number;
  name: string;
  description: string;
  image?: string;
  currentPage: number;
};

export const ResultCard: FC<Props> = ({
  id,
  name,
  description,
  image,
  currentPage,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const isSelected = useSelector((state: RootState) =>
    state.selectedItems.items.some((item) => item.id === id)
  );

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(
      toggleSelect({
        id,
        name,
        description,
        image,
        detailsUrl: `/${currentPage}/${id}`,
      })
    );
  };

  const handleClick = () => {
    void navigate({
      pathname: `/${currentPage}/${id}`,
      search: searchParams.toString(),
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={styles['result-card']}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Select ${name}`}
      />

      {image && <img src={image} alt={name} />}
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
