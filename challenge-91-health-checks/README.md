## Challenge 91 – Health Checks

### Overview
Add health check endpoints for monitoring application status and dependencies.

### Features
- Application health monitoring
- Dependency health checks
- Detailed health status reporting
- Kubernetes readiness/liveness probes

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `HEALTH_CHECK_TIMEOUT` (default 5000ms)
- `PORT` (default 3000)

### Endpoints
- `GET /health` → Basic health check
- `GET /health/details` → Detailed health status
- `GET /ready` → Readiness probe
- `GET /live` → Liveness probe

### Testing
- Test basic health check endpoint
- Verify dependency health checks
- Check health status reporting
- Validate Kubernetes probe endpoints

### Notes
- Implement health checks for database connections
- Add health checks for external services
- Use appropriate HTTP status codes
- Include timestamp and version information