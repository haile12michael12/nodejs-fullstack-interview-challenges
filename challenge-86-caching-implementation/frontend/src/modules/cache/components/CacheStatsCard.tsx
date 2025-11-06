import React from 'react';
import { ICacheStats } from '../../../core/interfaces/ICacheStats';
import { formatNumber, formatPercentage } from '../../../core/utils/formatters';

interface CacheStatsCardProps {
  stats: ICacheStats;
}

export const CacheStatsCard: React.FC<CacheStatsCardProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Cache Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Provider</p>
          <p className="text-lg font-semibold">{stats.provider}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Hit Rate</p>
          <p className="text-lg font-semibold text-green-600">{formatPercentage(stats.hitRate)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Hits</p>
          <p className="text-lg font-semibold">{formatNumber(stats.hits)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Misses</p>
          <p className="text-lg font-semibold">{formatNumber(stats.misses)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Keys</p>
          <p className="text-lg font-semibold">{formatNumber(stats.keys)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Max Size</p>
          <p className="text-lg font-semibold">{formatNumber(stats.maxSize)}</p>
        </div>
      </div>
    </div>
  );
};