import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ICacheStats } from '../../../core/interfaces/ICacheStats';

interface CacheChartProps {
  stats: ICacheStats[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const CacheChart: React.FC<CacheChartProps> = ({ stats }) => {
  // Prepare data for the bar chart
  const barData = stats.map((stat, index) => ({
    name: `Sample ${index + 1}`,
    hits: stat.hits,
    misses: stat.misses,
    hitRate: stat.hitRate,
  }));

  // Prepare data for the pie chart
  const pieData = [
    { name: 'Hits', value: stats.reduce((sum, stat) => sum + stat.hits, 0) },
    { name: 'Misses', value: stats.reduce((sum, stat) => sum + stat.misses, 0) },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Cache Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hits" fill="#0088FE" name="Hits" />
            <Bar dataKey="misses" fill="#FF8042" name="Misses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Hits vs Misses Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};