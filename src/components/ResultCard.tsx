import type React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: number;
  name: string;
  description: string;
  image?: string;
};

export const ResultCard: React.FC<Props> = ({ id, name, description, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${id}`);
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
