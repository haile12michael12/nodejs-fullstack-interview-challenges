
Actions

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- k6 load testing tool

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`
3. Install root dependencies: `npm install`

### Run
- Start all services: `npm run docker:up`
- Start development environment: `npm run dev`
- Run backend only: `npm run backend`
- Run frontend only: `npm run frontend`

### Load Testing
- Smoke test: `npm run test:load:smoke`
- Baseline test: `npm run test:load:baseline`
- Stress test: `npm run test:load:stress`

### Directory Structure
- `backend/` - Node.js Express API
- `frontend/` - React dashboard application
- `load-tests/` - k6 test scripts and monitoring configuration
- `.github/workflows/` - CI/CD workflows

### Monitoring
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3002 (admin/admin)

### Testing
- Unit tests: `npm test`
- Load tests: `npm run test:load:*`

### Notes
- All services can be run with Docker Compose
- Grafana dashboards are pre-configured
- Test results are stored in `load-tests/results/`