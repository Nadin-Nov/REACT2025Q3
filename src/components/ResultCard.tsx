import type React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Props = {
  id: number;
  name: string;
  description: string;
  image?: string;
  currentPage: number;
};

export const ResultCard: React.FC<Props> = ({ id, name, description, image, currentPage }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    navigate({
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
      style={{ cursor: 'pointer' }}
    >
      {image && <img src={image} alt={name} />}
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
