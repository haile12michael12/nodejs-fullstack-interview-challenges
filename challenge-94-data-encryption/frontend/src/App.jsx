import React from 'react';
import EncryptionDashboard from './pages/EncryptionDashboard';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Data Encryption Dashboard</h1>
      </header>
      <main className="main-content">
        <EncryptionDashboard />
      </main>
    </div>
  );
}

export default App;