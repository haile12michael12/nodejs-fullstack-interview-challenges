import React from 'react';

const ErrorTable = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return (
      <div className="card">
        <h2>Import Errors</h2>
        <p>No errors found in the import.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Import Errors</h2>
      <div className="table-container">
        <table className="error-table">
          <thead>
            <tr>
              <th>Row Number</th>
              <th>Error Message</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {errors.map((error, index) => (
              <tr key={index}>
                <td>{error.rowNumber}</td>
                <td>{error.errorMessage}</td>
                <td>
                  <pre>{JSON.stringify(error.rowData, null, 2)}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ErrorTable;