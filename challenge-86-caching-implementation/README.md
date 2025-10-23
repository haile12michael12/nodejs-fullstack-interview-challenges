## Challenge 86 – Caching Implementation

### Overview
Add caching for performance optimization using in-memory and external caching solutions.

### Features
- In-memory caching with LRU eviction
- Redis caching implementation
- Cache invalidation strategies
- Cache warming and preloading

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
- `CACHE_TTL` (default 300 seconds)
- `CACHE_MAX_ITEMS` (default 1000)
- `REDIS_URL` (optional)
- `PORT` (default 3000)

### Endpoints
- `GET /cache/stats` → Get cache statistics
- `POST /cache/invalidate` → Invalidate cache entries
- `POST /cache/warm` → Preload cache with data
- All GET endpoints support caching

### Testing
- Test in-memory caching performance
- Verify Redis caching integration
- Check cache invalidation strategies
- Validate cache warming functionality

### Notes
- Implement cache-aside pattern
- Use proper cache key naming conventions
- Handle cache stampede scenarios
- Monitor cache hit/miss ratios