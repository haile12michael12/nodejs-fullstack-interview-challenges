import React from 'react';
import ReportCard from './ReportCard';
import MetricChart from './MetricChart';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Load Test Dashboard</h2>
      <div className="dashboard-grid">
        <ReportCard 
          title="Response Time" 
          value="125ms" 
          description="Average response time" 
        />
        <ReportCard 
          title="Throughput" 
          value="450 req/s" 
          description="Requests per second" 
        />
        <ReportCard 
          title="Error Rate" 
          value="0.2%" 
          description="Failed requests" 
        />
        <ReportCard 
          title="Active Users" 
          value="1,240" 
          description="Concurrent users" 
        />
      </div>
      <MetricChart />
    </div>
  );
};

export default Dashboard;