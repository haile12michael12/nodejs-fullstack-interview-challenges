# API Caching Frontend

## Overview
This is the frontend dashboard for the API caching challenge. It provides a user interface to monitor cache statistics, configure cache settings, and test data fetching with caching.

## Features
- Cache configuration display
- Real-time cache statistics
- Cache management controls
- Data fetching interface
- Responsive design

## Components
- **CacheConfigCard** - Displays current cache configuration
- **CacheStatsCard** - Shows cache statistics and management controls
- **DataFetcher** - Interface for testing data fetching with caching

## Services
- **api.js** - API client for communicating with backend services

## Installation
```bash
npm install
```

## Running the Service
```bash
# Development mode
npm run start

# Production build
npm run build
```

## Development
The frontend is built with React and Vite, running on port 3001. It proxies API requests to the backend service running on port 3000.