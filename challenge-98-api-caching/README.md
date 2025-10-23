## Challenge 98 – API Caching

### Overview
Implement API response caching to improve performance and reduce server load.

### Features
- HTTP caching headers
- Response caching with TTL
- Cache invalidation strategies
- Conditional requests support

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `CACHE_TTL` (default 300 seconds)
- `CACHE_CONTROL` (default max-age=300)
- `PORT` (default 3000)

### Endpoints
- All GET endpoints support caching
- `GET /cache/config` → Get cache configuration
- `POST /cache/invalidate` → Invalidate cache
- `GET /cache/stats` → Get cache statistics

### Testing
- Test HTTP caching headers
- Verify response caching
- Check cache invalidation
- Validate conditional requests

### Notes
- Implement ETags for conditional requests
- Use proper Cache-Control headers
- Add Last-Modified headers
- Handle cache stampede prevention