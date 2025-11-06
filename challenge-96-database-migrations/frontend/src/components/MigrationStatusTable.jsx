import React from 'react';

const MigrationStatusTable = ({ status }) => {
  return (
    <div className="migration-status">
      <h3>Migration Status</h3>
      <table>
        <tbody>
          <tr>
            <td><strong>Status:</strong></td>
            <td>{status.status}</td>
          </tr>
          <tr>
            <td><strong>Pending Migrations:</strong></td>
            <td>{status.pendingMigrations}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MigrationStatusTable;