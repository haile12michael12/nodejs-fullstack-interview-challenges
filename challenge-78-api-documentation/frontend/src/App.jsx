import React from 'react';
import DocsViewer from './pages/DocsViewer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">API Documentation Portal</h1>
        </div>
      </header>
      <main>
        <DocsViewer />
      </main>
      <footer className="bg-white mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            API Documentation Portal - Interactive API Documentation
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;