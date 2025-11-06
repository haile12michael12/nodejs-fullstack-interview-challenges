## Challenge 33 – Horizontal Scaling

### Overview
Implement horizontal scaling with load balancing, clustering, and distributed architecture patterns using Node.js, Docker, and Kubernetes.

### Features
- Node.js clustering with master/worker architecture
- Multiple load balancing implementations (Nginx and Node.js)
- Session management with Redis for distributed state
- Health checks and failover mechanisms
- Auto-scaling simulation
- WebSocket support with sticky sessions
- Kubernetes HorizontalPodAutoscaler configuration

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Kubernetes (for deployment)

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`
3. Install load balancer dependencies: `cd lb && npm install`

### Run
- Docker Compose (recommended): `docker-compose up -d`
- Local development: `./scripts/start-local.sh`
- Kubernetes: `kubectl apply -f infra/k8s/`

### Environment
- `PORT` - Server port (default: 3000)
- `LB_PORT` - Load balancer port (default: 8080)
- `REDIS_URL` - Redis connection URL
- `SESSION_SECRET` - Session encryption secret
- `WORKER_COUNT` - Number of cluster workers

### Directory Structure
- `backend/` - Node.js Express application with clustering
- `frontend/` - React dashboard application
- `lb/` - Node.js load balancer implementation
- `nginx/` - Nginx load balancer configuration
- `infra/k8s/` - Kubernetes deployment files
- `scripts/` - Automation scripts
- `docs/` - Documentation files

### Testing
- Run smoke tests: `cd backend && npm test`
- Load testing with Apache Bench or wrk
- Session persistence across instances
- Failover and recovery scenarios
- Auto-scaling behavior simulation

### Notes
- Implements proper inter-process communication
- Uses Redis for distributed session storage
- Supports sticky sessions for WebSocket connections
- Includes graceful shutdown procedures
- Provides Kubernetes deployment examples