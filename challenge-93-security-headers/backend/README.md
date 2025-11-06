# Security Headers Backend

## Overview
This is the backend service for the security headers challenge. It implements security headers using Helmet.js middleware.

## Features
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- DNS Prefetch Control
- Security configuration management

## API Endpoints
- `GET /api/security/config` - Get security configuration
- `POST /api/security/config` - Update security configuration
- `GET /api/security/status` - Get security headers status
- `GET /health` - Health check endpoint

## Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (default: development)

## Installation
```bash
npm install
```

## Running the Service
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Testing
```bash
npm test
```