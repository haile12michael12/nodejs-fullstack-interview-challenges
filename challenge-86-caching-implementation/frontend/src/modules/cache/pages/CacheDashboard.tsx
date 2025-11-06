import React from 'react';
import { useCacheData } from '../hooks/useCacheData';
import { CacheStatsCard } from '../components/CacheStatsCard';
import { CacheChart } from '../components/CacheChart';
import { CacheInvalidateForm } from '../components/CacheInvalidateForm';
import { CacheWarmButton } from '../components/CacheWarmButton';

export const CacheDashboard: React.FC = () => {
  const { stats, loading, error, fetchStats, invalidateCache, warmCache } = useCacheData();

  if (loading && !stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
            <div className="mt-2 text-sm text-red-700">
              <button
                onClick={fetchStats}
                className="font-medium text-red-800 hover:text-red-900"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For the chart, we'll create sample data points
  const chartData = stats ? [stats] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cache Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage your application's caching performance
        </p>
      </div>

      {stats && (
        <>
          <CacheStatsCard stats={stats} />
          
          <CacheChart stats={chartData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CacheInvalidateForm 
              onInvalidate={invalidateCache} 
              loading={loading} 
            />
            <CacheWarmButton 
              onWarm={warmCache} 
              loading={loading} 
            />
          </div>
        </>
      )}
    </div>
  );
};