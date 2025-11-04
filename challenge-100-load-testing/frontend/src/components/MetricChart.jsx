import React from 'react';

const MetricChart = () => {
  // Mock data for chart
  const data = [
    { time: '00:00', value: 120 },
    { time: '00:05', value: 145 },
    { time: '00:10', value: 132 },
    { time: '00:15', value: 168 },
    { time: '00:20', value: 155 },
    { time: '00:25', value: 178 },
    { time: '00:30', value: 162 }
  ];

  return (
    <div className="metric-chart">
      <h3>Performance Metrics</h3>
      <div className="chart-container">
        {/* Simple bar chart representation */}
        <div className="chart">
          {data.map((item, index) => (
            <div key={index} className="bar-container">
              <div 
                className="bar" 
                style={{ height: `${item.value}px` }}
              >
                <span className="value-label">{item.value}</span>
              </div>
              <div className="time-label">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricChart;