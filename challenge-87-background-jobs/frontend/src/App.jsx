import React from 'react';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Background Jobs Manager</h1>
          <p className="mt-1 text-gray-600">Manage and monitor background jobs</p>
        </div>
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;