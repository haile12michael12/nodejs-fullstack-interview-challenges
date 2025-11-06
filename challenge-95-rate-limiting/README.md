## Challenge 95 – Rate Limiting

### Overview
Implement rate limiting for API endpoints using express-rate-limit with a web interface for monitoring and configuration.

### Features
- IP-based rate limiting
- Configurable window and request limits
- Rate limit headers
- Web-based monitoring dashboard
- RESTful API for rate limit management
- Optional Redis storage

### Prerequisites
- Node.js 18+
- Redis (optional)

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`

### Run
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run start`

### Environment
- `RATE_LIMIT_WINDOW_MS` (default 900000ms)
- `RATE_LIMIT_MAX` (default 100 requests)
- `REDIS_HOST` (default localhost)
- `REDIS_PORT` (default 6379)
- `PORT` (default 3000)

### API Endpoints
- `GET /` → Main endpoint (rate limited)
- `GET /api/rate-limit/config` → Get rate limit configuration
- `GET /api/rate-limit/status` → Get current rate limit status
- `POST /api/rate-limit/reset/:ip` → Reset rate limit for IP
- `GET /health` → Health check (not rate limited)

### Directory Structure
- `backend/` - Node.js Express API with rate limiting
- `frontend/` - React dashboard application

### Testing
- Unit tests: `cd backend && npm test`
- Manual testing through dashboard UI

### Notes
- Uses express-rate-limit for rate limiting
- Implements standard rate limit headers
- Provides both API and dashboard interfaces
- Supports optional Redis storage