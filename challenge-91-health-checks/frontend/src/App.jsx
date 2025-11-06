import React from 'react';
import HealthStatus from './components/HealthStatus';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Health Checks Dashboard</h1>
      </header>
      <main className="main-content">
        <HealthStatus />
      </main>
    </div>
  );
}

export default App;