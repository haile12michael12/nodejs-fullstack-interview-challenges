import React from 'react';
import CacheConfigCard from '../components/CacheConfigCard';
import CacheStatsCard from '../components/CacheStatsCard';
import DataFetcher from '../components/DataFetcher';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <CacheConfigCard />
        <CacheStatsCard />
        <DataFetcher />
      </div>
    </div>
  );
};

export default Dashboard;