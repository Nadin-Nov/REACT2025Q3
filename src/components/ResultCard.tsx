import type React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { RootState } from '../store';
import { toggleSelect } from '../store/selectedItemsSlice';

type Props = {
  id: number;
  name: string;
  description: string;
  image?: string;
  currentPage: number;
};

export const ResultCard: React.FC<Props> = ({
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div
      className="result-card"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}
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
