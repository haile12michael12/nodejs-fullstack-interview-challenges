import React from 'react';

const CacheConfigCard = () => {
  return (
    <div className="card">
      <h2>Cache Configuration</h2>
      <div className="config-item">
        <label>Cache TTL:</label>
        <span>300 seconds</span>
      </div>
      <div className="config-item">
        <label>Max Items:</label>
        <span>1000 items</span>
      </div>
      <div className="config-item">
        <label>ETag Enabled:</label>
        <span>Yes</span>
      </div>
      <div className="config-item">
        <label>Cache Control:</label>
        <span>public, max-age=300</span>
      </div>
    </div>
  );
};

export default CacheConfigCard;