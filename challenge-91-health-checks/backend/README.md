# Health Checks Backend

## Overview
This is the backend service for the health checks challenge. It implements comprehensive health checking for applications including system metrics, dependency checks, and readiness/liveness probes.

## Features
- Basic health checks
- Detailed health information
- Dependency monitoring (database, Redis, external APIs)
- Readiness and liveness probes
- Configurable health check intervals and timeouts

## API Endpoints
- `GET /health` - Basic health check
- `GET /api/health` - Health status endpoint
- `GET /api/health/detailed` - Detailed health information
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/alive` - Liveness probe

## Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (default: development)
- `HEALTH_CHECK_INTERVAL` - Health check interval in ms (default: 30000)
- `HEALTH_CHECK_TIMEOUT` - Health check timeout in ms (default: 5000)
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: healthcheck_db)
- `REDIS_HOST` - Redis host (default: localhost)
- `REDIS_PORT` - Redis port (default: 6379)

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