import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogsPage from './pages/LogsPage';
import LogDetailPage from './pages/LogDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Request Logger</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<LogsPage />} />
              <Route path="/logs/:id" element={<LogDetailPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;