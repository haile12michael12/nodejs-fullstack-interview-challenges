import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackupList from './pages/BackupList';
import CreateBackup from './pages/CreateBackup';
import RestoreBackup from './pages/RestoreBackup';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BackupList />} />
            <Route path="/backups" element={<BackupList />} />
            <Route path="/backups/create" element={<CreateBackup />} />
            <Route path="/backups/restore" element={<RestoreBackup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;