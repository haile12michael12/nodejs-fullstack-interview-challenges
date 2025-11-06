import React from 'react';
import ConfigDisplay from './components/ConfigDisplay';
import RateLimitStatus from './components/RateLimitStatus';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Rate Limiting Dashboard</h1>
      </header>
      <main className="main-content">
        <div className="dashboard">
          <ConfigDisplay />
          <RateLimitStatus />
        </div>
      </main>
    </div>
  );
}

export default App;