import React from 'react';

const XMLViewer = ({ xmlContent, title = "Raw XML Response" }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>{title}</h3>
      <pre style={{ 
        backgroundColor: '#f4f4f4', 
        border: '1px solid #ddd', 
        borderRadius: '4px', 
        padding: '15px', 
        overflowX: 'auto',
        fontSize: '14px',
        fontFamily: 'monospace'
      }}>
        {xmlContent || 'No XML content to display'}
      </pre>
    </div>
  );
};

export default XMLViewer;