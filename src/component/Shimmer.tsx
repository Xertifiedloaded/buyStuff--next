import React from 'react';

const Shimmer: React.FC = () => (
  <div className="shimmer-wrapper">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="shimmer-item" />
    ))}
  </div>
);

export default Shimmer;