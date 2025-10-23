## Challenge 35 – Advanced Caching Strategies

### Overview
Implement advanced caching patterns including Redis, in-memory caching, and distributed caching strategies.

### Features
- Multi-level caching (L1, L2, L3)
- Cache invalidation strategies
- Cache warming and preloading
- Distributed caching with consistency
- Cache performance monitoring

### Prerequisites
- Node.js 18+
- Redis

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `REDIS_URL` (default redis://localhost:6379)
- `CACHE_TTL` (default 300 seconds)
- `PORT` (default 3000)

### Endpoints
- `GET /data/:id` → Retrieve data with caching
- `POST /invalidate/:key` → Invalidate specific cache entry
- `POST /warm` → Preload cache with data
- `GET /cache-stats` → Get cache performance metrics

### Testing
- Compare response times with and without caching
- Test cache invalidation strategies
- Monitor cache hit/miss ratios
- Test distributed caching across instances

### Notes
- Implement write-through, write-behind, and read-through patterns
- Use cache stampede protection
- Handle cache consistency in distributed systems
- Implement cache size and eviction policies