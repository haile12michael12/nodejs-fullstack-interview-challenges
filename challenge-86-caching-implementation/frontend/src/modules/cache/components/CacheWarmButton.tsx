import React, { useState } from 'react';

interface CacheWarmButtonProps {
  onWarm: (data: Record<string, any>) => void;
  loading: boolean;
}

export const CacheWarmButton: React.FC<CacheWarmButtonProps> = ({ onWarm, loading }) => {
  const handleWarmCache = () => {
    // Sample data to warm the cache with
    const sampleData = {
      'user:1': { id: 1, name: 'John Doe', email: 'john@example.com' },
      'user:2': { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      'product:1': { id: 1, name: 'Product A', price: 29.99 },
      'product:2': { id: 2, name: 'Product B', price: 39.99 },
    };
    
    onWarm(sampleData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Warm Cache</h3>
      <p className="text-sm text-gray-500 mb-4">
        Preload the cache with sample data to improve initial performance.
      </p>
      <button
        onClick={handleWarmCache}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {loading ? 'Warming Cache...' : 'Warm Cache'}
      </button>
    </div>
  );
};