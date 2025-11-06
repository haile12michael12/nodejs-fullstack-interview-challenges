import React from 'react';
import ImportDashboard from './pages/ImportDashboard';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Data Import Dashboard</h1>
      </header>
      <main className="main-content">
        <ImportDashboard />
      </main>
    </div>
  );
}

export default App;