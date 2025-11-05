## Challenge 98 – API Caching

### Overview
Implement API response caching using LRU cache with ETag support to improve performance and reduce server load.

### Features
- LRU (Least Recently Used) caching
- ETag generation and validation
- Cache statistics tracking
- Configurable cache settings
- RESTful API with caching middleware
- Dashboard for monitoring cache performance

### Prerequisites
- Node.js 18+

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`

### Run
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run start`

### Environment
- `CACHE_TTL` (default 300 seconds)
- `CACHE_MAX_ITEMS` (default 1000 items)
- `CACHE_ETAG_ENABLED` (default true)
- `CACHE_CONTROL` (default public, max-age=300)
- `PORT` (default 3000)

### API Endpoints
- `GET /api/data/items` → Get cached data
- `GET /api/cache/stats` → Get cache statistics
- `DELETE /api/cache/clear` → Clear cache
- `DELETE /api/cache/stats/reset` → Reset cache statistics
- `GET /health` → Health check

### Directory Structure
- `backend/` - Node.js Express API with LRU caching
- `frontend/` - React dashboard application

### Testing
- Unit tests: `cd backend && npm test`
- Manual testing through dashboard UI

### Notes
- Uses lru-cache package for efficient memory management
- Implements ETags for conditional requests
- Provides real-time cache statistics
- Supports cache invalidation