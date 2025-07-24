import type React from 'react';

type Props = {
  name: string;
  description: string;
  image?: string;
};

export const ResultCard: React.FC<Props> = ({ name, description, image }) => {
  return (
    <div className="result-card">
      {image && <img src={image} alt={name} />}
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
