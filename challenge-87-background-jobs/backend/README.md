# Background Jobs Backend

## Overview
This is the backend service for the background jobs challenge. It provides a RESTful API for managing background jobs using Bull queue system with Redis.

## Features
- Job creation and management
- Background job processing with workers
- Job status tracking
- RESTful API endpoints
- Error handling and logging

## Prerequisites
- Node.js 16+
- Redis server

## Installation
```bash
npm install
```

## Environment Variables
Create a `.env` file based on `.env.example`:
- `PORT` - Server port (default: 3000)
- `REDIS_HOST` - Redis server host (default: localhost)
- `REDIS_PORT` - Redis server port (default: 6379)
- `JOB_CONCURRENCY` - Number of concurrent jobs (default: 5)

## Running the Service
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints
- `POST /api/jobs` - Create a new job
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get a specific job
- `GET /api/jobs/status/:status` - Get jobs by status

## Testing
```bash
npm test
```

## Architecture
The backend follows a clean architecture pattern with the following layers:
- **Presentation Layer**: Express.js controllers and routes
- **Application Layer**: Use cases that orchestrate business logic
- **Domain Layer**: Entities and interfaces
- **Infrastructure Layer**: Implementations of interfaces (repositories, services, workers)