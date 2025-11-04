import React from 'react';
import Dashboard from '../components/Dashboard';

const Home = () => {
  return (
    <div className="home">
      <header>
        <h1>Load Testing Dashboard</h1>
        <p>Monitor and analyze your application performance under load</p>
      </header>
      <Dashboard />
    </div>
  );
};

export default Home;