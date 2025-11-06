# Security Headers Frontend

## Overview
This is the frontend dashboard for the security headers challenge. It provides a user interface to test and monitor security headers configuration.

## Features
- Security headers status display
- CSP testing capabilities
- Configuration visualization
- Responsive design

## Components
- **CSPTester** - Component for testing Content Security Policy

## API
- **security.js** - Axios client for communicating with backend services

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