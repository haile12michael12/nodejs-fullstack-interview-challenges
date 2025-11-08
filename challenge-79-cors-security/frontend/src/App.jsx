import React from 'react';
import HomePage from './pages/HomePage';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">CORS Security Manager</h1>
        </div>
      </header>
      <main>
        <HomePage />
      </main>
      <footer className="bg-white mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            CORS Security Challenge - Manage and test Cross-Origin Resource Sharing policies
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;