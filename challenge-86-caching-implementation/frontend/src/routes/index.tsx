import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../modules/shared/components/Layout';
import { CacheDashboard } from '../modules/cache/pages/CacheDashboard';

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CacheDashboard />} />
          <Route path="/dashboard" element={<CacheDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};