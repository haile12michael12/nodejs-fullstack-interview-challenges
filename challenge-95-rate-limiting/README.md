## Challenge 95 – Rate Limiting

### Overview
Add rate limiting to API endpoints to prevent abuse and ensure fair usage.

### Features
- Per-endpoint rate limiting
- IP-based and user-based limiting
- Rate limit configuration
- Rate limit exceeded handling

### Prerequisites
- Node.js 18+
- Redis (optional)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `RATE_LIMIT_WINDOW` (default 900000ms)
- `RATE_LIMIT_MAX` (default 100 requests)
- `REDIS_URL` (optional)
- `PORT` (default 3000)

### Endpoints
- All endpoints have rate limiting
- `GET /rate-limit/config` → Get rate limit configuration
- `GET /rate-limit/status` → Get current rate limit status
- `POST /rate-limit/reset` → Reset rate limit for IP/user

### Testing
- Test per-endpoint rate limiting
- Verify IP-based limiting
- Check user-based rate limiting
- Validate rate limit exceeded responses

### Notes
- Use express-rate-limit or similar
- Implement sliding window algorithm
- Add rate limit headers to responses
- Handle rate limit storage (memory vs Redis)