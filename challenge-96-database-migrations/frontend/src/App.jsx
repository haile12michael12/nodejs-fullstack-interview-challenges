import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MigrationDashboard from './pages/MigrationDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Database Migration Manager</h1>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MigrationDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;