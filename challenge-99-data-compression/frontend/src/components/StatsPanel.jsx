import React from 'react';

const StatsPanel = ({ stats }) => {
  if (!stats) {
    return (
      <div className="panel">
        <h2>Compression Statistics</h2>
        <p>Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>Compression Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Compressions</h3>
          <div className="value">{stats.totalCompressions}</div>
        </div>
        
        <div className="stat-card">
          <h3>Data Compressed</h3>
          <div className="value">{stats.totalDataCompressed} bytes</div>
        </div>
        
        <div className="stat-card">
          <h3>Avg. Compression Ratio</h3>
          <div className="value">{stats.averageCompressionRatio}%</div>
        </div>
        
        <div className="stat-card">
          <h3>GZIP Compressions</h3>
          <div className="value">{stats.algorithms.gzip.count}</div>
        </div>
        
        <div className="stat-card">
          <h3>Brotli Compressions</h3>
          <div className="value">{stats.algorithms.brotli.count}</div>
        </div>
        
        <div className="stat-card">
          <h3>GZIP Avg. Ratio</h3>
          <div className="value">{stats.algorithms.gzip.averageRatio || 0}%</div>
        </div>
        
        <div className="stat-card">
          <h3>Brotli Avg. Ratio</h3>
          <div className="value">{stats.algorithms.brotli.averageRatio || 0}%</div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;