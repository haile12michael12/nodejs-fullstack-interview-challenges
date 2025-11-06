import React from 'react';
import CSPTester from './components/CSPTester';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Security Headers Dashboard</h1>
      </header>
      <main className="main-content">
        <div className="dashboard">
          <CSPTester />
        </div>
      </main>
    </div>
  );
}

export default App;