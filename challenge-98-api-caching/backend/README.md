# API Caching Backend

## Overview
This is the backend service for the API caching challenge. It provides caching mechanisms for API responses using LRU cache with ETag support.

## Features
- LRU (Least Recently Used) caching
- ETag generation and validation
- Cache statistics tracking
- Configurable cache settings
- RESTful API endpoints

## API Endpoints
- `GET /api/data/items` - Get cached data
- `GET /api/cache/stats` - Get cache statistics
- `DELETE /api/cache/clear` - Clear cache
- `DELETE /api/cache/stats/reset` - Reset cache statistics
- `GET /health` - Health check endpoint

## Environment Variables
- `PORT` - Server port (default: 3000)
- `CACHE_TTL` - Cache time-to-live in seconds (default: 300)
- `CACHE_MAX_ITEMS` - Maximum items in cache (default: 1000)
- `CACHE_ETAG_ENABLED` - Enable ETag support (default: true)
- `CACHE_CONTROL` - Cache-Control header value (default: "public, max-age=300")

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