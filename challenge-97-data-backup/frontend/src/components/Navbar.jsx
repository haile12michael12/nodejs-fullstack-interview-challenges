import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Data Backup Manager</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/backups">View Backups</Link>
        </li>
        <li>
          <Link to="/backups/create">Create Backup</Link>
        </li>
        <li>
          <Link to="/backups/restore">Restore Backup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;