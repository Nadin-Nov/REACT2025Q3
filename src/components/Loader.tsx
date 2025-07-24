import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader" data-testid="spinner" role="status">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
