# Health Checks Frontend

## Overview
This is the frontend dashboard for the health checks challenge. It provides a user interface to monitor application health, system metrics, and dependency status.

## Features
- Real-time health status monitoring
- System information display
- Memory usage visualization
- Dependency status tracking
- Service readiness and liveness indicators

## Components
- **HealthStatus** - Main dashboard component displaying all health information

## API
- **healthApi.js** - Axios client for communicating with backend health services

## Installation
```bash
npm install
```

## Running the Service
```bash
# Development mode
npm run start

# Production build
npm run build
```

## Development
The frontend is built with React and Vite, running on port 3001. It proxies API requests to the backend service running on port 3000.