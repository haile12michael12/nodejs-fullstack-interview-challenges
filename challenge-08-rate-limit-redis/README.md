## Challenge 08 – Rate Limited API with Redis

### Overview
Protect an endpoint using a Redis-backed rate limiter. Implement token bucket or fixed window manually.

### Prerequisites
- Node.js 18+
- Redis (local or container)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `REDIS_URL=redis://localhost:6379 npm start`
- Frontend: `npm start`

### Notes
- Return `429 Too Many Requests` with retry hints.
