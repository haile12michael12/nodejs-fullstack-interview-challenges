import React, { useState, useEffect } from 'react';
import PerformanceChart from '../components/PerformanceChart';
import MetricsTable from '../components/MetricsTable';
import SlowQueriesTable from '../components/SlowQueriesTable';
import { getPerformanceMetrics, getMetrics, getSlowQueries } from '../utils/api';

const Dashboard = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [metricsData, setMetricsData] = useState(null);
  const [slowQueriesData, setSlowQueriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [performance, metrics, slowQueries] = await Promise.all([
        getPerformanceMetrics(),
        getMetrics(),
        getSlowQueries()
      ]);
      setPerformanceData(performance);
      setMetricsData(metrics);
      setSlowQueriesData(slowQueries);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !performanceData) return <div className="loading">Loading performance data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Performance Overview</h2>
        {performanceData && <PerformanceChart data={performanceData} />}
      </div>
      
      <div className="card">
        <h2>Metrics</h2>
        {metricsData && <MetricsTable data={metricsData} />}
      </div>
      
      <div className="card">
        <h2>Slow Queries</h2>
        <SlowQueriesTable data={slowQueriesData} />
      </div>
    </div>
  );
};

export default Dashboard;