# Challenge 80 – Request Logging

## Overview
Add request logging and monitoring to track API usage, performance, and debugging information.

## Features
- HTTP request/response logging
- Performance metrics and timing
- Request ID tracking
- Log filtering and search
- Real-time dashboard with charts

## Prerequisites
- Node.js 18+

## Setup
1. Backend: `cd backend && npm install`
2. Frontend: `cd frontend && npm install`

## Run
1. Start the backend: `cd backend && npm start`
2. Start the frontend: `cd frontend && npm start`

## Environment
- `LOG_LEVEL` (default info)
- `REQUEST_LOG_FORMAT` (default combined)
- `PORT` (default 3000)

## Endpoints
- `GET /api/logs/requests` → Get request logs
- `GET /api/logs/requests/:id` → Get specific request log
- `POST /api/logs/search` → Search logs by criteria
- `GET /api/logs/stats` → Get log statistics
- `GET /api/logs/performance` → Get performance data
- All API endpoints generate logs

## Testing
- Verify request logging middleware
- Test log format customization
- Check performance timing metrics
- Validate log filtering and search

## Notes
- Uses morgan for HTTP logging
- Implements request ID generation and tracking
- Adds response time measurements
- Supports structured logging formats
- Frontend dashboard with real-time charts

## Docker
To run with Docker:
1. `docker-compose up --build`
2. Access frontend at http://localhost:3001
3. Access backend API at http://localhost:3000