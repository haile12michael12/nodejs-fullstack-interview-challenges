import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1>Data Compression Dashboard</h1>
      <nav>
        <a href="/" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Dashboard</a>
      </nav>
    </header>
  );
};

export default Header;