# Caching Implementation Challenge

## Overview
This challenge implements a full-stack caching solution with both in-memory and Redis caching providers. The application includes a backend API for cache management and a frontend dashboard for monitoring cache performance.

## Features
- In-memory caching with LRU eviction
- Redis caching implementation
- Cache invalidation strategies
- Cache warming and preloading
- Cache statistics dashboard
- RESTful API endpoints

## Prerequisites
- Node.js 18+
- Redis (optional, for Redis caching)

## Setup

### Backend
```bash
cd backend
npm install
npm run build
```

### Frontend
```bash
cd frontend
npm install
npm run build
```

## Running the Application

### Backend
```bash
cd backend
npm start
# or for development
npm run dev
```

### Frontend
```bash
cd frontend
npm start
# or for production
npm run preview
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3000)
- `CACHE_TTL` - Cache time-to-live in seconds (default: 300)
- `CACHE_MAX_ITEMS` - Maximum items in memory cache (default: 1000)
- `REDIS_URL` - Redis connection URL (optional)

## API Endpoints
- `GET /api/cache/stats` - Get cache statistics
- `POST /api/cache/invalidate` - Invalidate cache entries
- `POST /api/cache/warm` - Preload cache with data
- `GET /api/health` - Health check endpoint

## Testing
- Unit tests for cache providers
- Integration tests for API endpoints

```bash
cd backend
npm test
```