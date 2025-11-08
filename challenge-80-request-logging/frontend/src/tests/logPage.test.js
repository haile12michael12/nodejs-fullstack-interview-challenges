import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogsPage from '../pages/LogsPage';

// Mock the logApi
jest.mock('../services/logApi', () => ({
  logApi: {
    getLogs: jest.fn(),
    getStats: jest.fn(),
    getPerformance: jest.fn()
  }
}));

const { logApi } = require('../services/logApi');

describe('LogsPage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    logApi.getLogs.mockResolvedValue({ data: [] });
    logApi.getStats.mockResolvedValue({ data: {} });
    logApi.getPerformance.mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <LogsPage />
      </BrowserRouter>
    );

    // Should show loading spinner
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders logs table when data is loaded', async () => {
    const mockLogs = [
      {
        id: 1,
        requestId: 'req-123',
        method: 'GET',
        url: '/api/health',
        status: 200,
        responseTime: 45,
        timestamp: '2023-01-01T10:00:00Z'
      }
    ];

    logApi.getLogs.mockResolvedValue({ data: mockLogs });
    logApi.getStats.mockResolvedValue({ data: {} });
    logApi.getPerformance.mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <LogsPage />
      </BrowserRouter>
    );

    // Wait for async operations to complete
    await waitFor(() => {
      expect(screen.getByText('Request Logs')).toBeInTheDocument();
    });

    // Check if log data is displayed
    expect(screen.getByText('req-123')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('/api/health')).toBeInTheDocument();
  });

  it('shows error message when API fails', async () => {
    logApi.getLogs.mockRejectedValue(new Error('API Error'));
    logApi.getStats.mockResolvedValue({ data: {} });
    logApi.getPerformance.mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <LogsPage />
      </BrowserRouter>
    );

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch logs')).toBeInTheDocument();
    });
  });
});