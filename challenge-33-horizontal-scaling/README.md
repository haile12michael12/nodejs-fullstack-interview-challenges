## Challenge 33 – Horizontal Scaling

### Overview
Scale a service horizontally with load balancing, clustering, and distributed architecture patterns.

### Features
- Node.js clustering for multi-core utilization
- Load balancing strategies
- Session management across instances
- Health checks and failover
- Auto-scaling based on metrics

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `PORT` (default 3000)
- `CLUSTER_WORKERS` (default based on CPU cores)
- `LOAD_BALANCER_URL` (default http://localhost:8080)

### Endpoints
- `GET /health` → Health check endpoint
- `GET /stats` → Instance statistics
- `POST /scale` → Manual scaling trigger
- `GET /session` → Session information

### Testing
- Run multiple instances behind a load balancer
- Test session persistence across instances
- Monitor resource usage and performance
- Test failover scenarios

### Notes
- Implement proper inter-process communication
- Use sticky sessions for WebSocket connections
- Handle shared state with external storage
- Implement graceful shutdown procedures