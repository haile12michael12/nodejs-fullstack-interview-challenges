import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PerformanceChart = ({ stats, performance }) => {
  if (!stats || !performance) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500 text-center">No performance data available</p>
      </div>
    );
  }

  // Status codes distribution chart
  const statusData = {
    labels: Object.keys(stats.statusCounts || {}),
    datasets: [
      {
        label: 'Status Codes',
        data: Object.values(stats.statusCounts || {}),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // HTTP methods distribution chart
  const methodData = {
    labels: Object.keys(stats.methodCounts || {}),
    datasets: [
      {
        label: 'HTTP Methods',
        data: Object.values(stats.methodCounts || {}),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Performance metrics chart
  const performanceData = {
    labels: ['Min', 'Avg', 'Max'],
    datasets: [
      {
        label: 'Response Time (ms)',
        data: [
          performance.responseTime?.min || 0,
          performance.responseTime?.avg || 0,
          performance.responseTime?.max || 0
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        font: {
          size: 16
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status Codes Distribution</h3>
        <Doughnut data={statusData} options={chartOptions} />
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">HTTP Methods Distribution</h3>
        <Doughnut data={methodData} options={chartOptions} />
      </div>
      
      <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Response Time Metrics</h3>
        <Bar data={performanceData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PerformanceChart;