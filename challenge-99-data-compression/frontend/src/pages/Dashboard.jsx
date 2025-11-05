import React, { useState, useEffect } from 'react';
import ConfigPanel from '../components/ConfigPanel';
import StatsPanel from '../components/StatsPanel';
import { useCompressionAPI } from '../hooks/useCompressionAPI';

const Dashboard = () => {
  const { compressText, getStats, stats, loading, error } = useCompressionAPI();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      await getStats();
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleCompress = async ({ text, algorithm }) => {
    try {
      const compressionResult = await compressText(text, algorithm);
      setResult(compressionResult);
      // Refresh stats after compression
      await fetchStats();
    } catch (err) {
      console.error('Compression failed:', err);
    }
  };

  return (
    <div className="dashboard">
      <ConfigPanel onCompress={handleCompress} />
      
      <div className="panel">
        <h2>Compression Result</h2>
        {loading && <p>Processing...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {result && (
          <div>
            <p><strong>Original Size:</strong> {result.originalSize} bytes</p>
            <p><strong>Compressed Size:</strong> {result.compressedSize} bytes</p>
            <p><strong>Compression Ratio:</strong> {result.compressionRatio}%</p>
            <p><strong>Algorithm:</strong> {result.algorithm}</p>
            <p><strong>Timestamp:</strong> {result.timestamp}</p>
          </div>
        )}
        {!result && !loading && <p>Enter text and click compress to see results.</p>}
      </div>
      
      <StatsPanel stats={stats} />
    </div>
  );
};

export default Dashboard;