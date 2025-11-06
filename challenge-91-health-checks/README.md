## Challenge 91 – Health Checks

### Overview
Implement comprehensive health checking for applications including system metrics, dependency checks, and readiness/liveness probes.

### Features
- Basic health checks
- Detailed health information
- Dependency monitoring (database, Redis, external APIs)
- Readiness and liveness probes
- Configurable health check intervals and timeouts

### Prerequisites
- Node.js 18+

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`

### Run
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run start`

### Environment
- `HEALTH_CHECK_INTERVAL` - Health check interval in ms (default: 30000)
- `HEALTH_CHECK_TIMEOUT` - Health check timeout in ms (default: 5000)
- `PORT` - Server port (default: 3000)
- `DB_HOST` - Database host (default: localhost)

### API Endpoints
- `GET /health` - Basic health check
- `GET /api/health` - Health status endpoint
- `GET /api/health/detailed` - Detailed health information
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/alive` - Liveness probe

### Directory Structure
- `backend/` - Node.js Express API with health check service
- `frontend/` - React dashboard application

### Testing
- Unit tests: `cd backend && npm test`
- Manual testing through dashboard UI

### Notes
- Implements health checks for database connections
- Adds health checks for external services
- Uses appropriate HTTP status codes
- Includes timestamp and version information