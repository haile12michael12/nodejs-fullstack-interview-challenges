import React from 'react';

const ReportCard = ({ title, value, description }) => {
  return (
    <div className="report-card">
      <h3>{title}</h3>
      <div className="value">{value}</div>
      <div className="description">{description}</div>
    </div>
  );
};

export default ReportCard;