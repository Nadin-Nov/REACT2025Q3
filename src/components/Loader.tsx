import type { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className="loader" data-testid="spinner" role="status">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};
