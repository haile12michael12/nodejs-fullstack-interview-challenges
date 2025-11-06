import React, { useState } from 'react';

interface CacheInvalidateFormProps {
  onInvalidate: (pattern?: string) => void;
  loading: boolean;
}

export const CacheInvalidateForm: React.FC<CacheInvalidateFormProps> = ({ onInvalidate, loading }) => {
  const [pattern, setPattern] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInvalidate(pattern || undefined);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Invalidate Cache</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="pattern" className="block text-sm font-medium text-gray-700">
            Pattern (optional)
          </label>
          <input
            type="text"
            id="pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., user:* or product:*"
          />
          <p className="mt-2 text-sm text-gray-500">
            Leave empty to invalidate all cache entries
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {loading ? 'Invalidating...' : 'Invalidate Cache'}
        </button>
      </form>
    </div>
  );
};