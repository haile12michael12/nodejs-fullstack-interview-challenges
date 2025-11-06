import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExportProvider } from './context/ExportContext';
import HomePage from './pages';
import AdvancedExportPage from './pages/export/advanced';
import './styles/export.css';

function App() {
  return (
    <ExportProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold text-gray-900">Data Export Dashboard</h1>
            </div>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/export/advanced" element={<AdvancedExportPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ExportProvider>
  );
}

export default App;