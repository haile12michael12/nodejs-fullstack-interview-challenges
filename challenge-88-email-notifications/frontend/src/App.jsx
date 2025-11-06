import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TemplatesPage from './pages/Templates';
import SendEmailPage from './pages/SendEmail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Email Notifications</h1>
            <nav className="mt-4">
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="text-blue-500 hover:text-blue-700">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="text-blue-500 hover:text-blue-700">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="/send" className="text-blue-500 hover:text-blue-700">
                    Send Email
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/send" element={<SendEmailPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;