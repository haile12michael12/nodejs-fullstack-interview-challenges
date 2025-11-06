# Rate Limiting Backend

## Overview
This is the backend service for the rate limiting challenge. It implements rate limiting for API endpoints using express-rate-limit with optional Redis storage.

## Features
- IP-based rate limiting
- Configurable window and request limits
- Rate limit headers
- Health check endpoint
- RESTful API endpoints for rate limit management

## API Endpoints
- `GET /` - Main endpoint (rate limited)
- `GET /api/rate-limit/config` - Get rate limit configuration
- `GET /api/rate-limit/status` - Get rate limit status
- `POST /api/rate-limit/reset/:ip` - Reset rate limit for an IP
- `GET /health` - Health check endpoint (not rate limited)

## Environment Variables
- `PORT` - Server port (default: 3000)
- `RATE_LIMIT_WINDOW_MS` - Rate limit window in milliseconds (default: 900000 - 15 minutes)
- `RATE_LIMIT_MAX` - Maximum requests per window (default: 100)
- `RATE_LIMIT_MESSAGE` - Message returned when rate limit is exceeded
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