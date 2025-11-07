import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Search and Filter</h1>
      <Link to="/search">Start Searching</Link>
    </div>
  );
};

export default HomePage;