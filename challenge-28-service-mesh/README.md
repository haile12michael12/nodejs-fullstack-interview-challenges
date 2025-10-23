## Challenge 28 – Service Mesh Implementation

### Overview
Implement a service mesh with Istio-like features including service discovery, traffic management, and observability.

### Features
- Service discovery and registration
- Traffic routing and load balancing
- Circuit breaking and retries
- Metrics collection and tracing
- Security policies (mTLS, authorization)

### Prerequisites
- Node.js 18+
- Docker for multi-service deployment

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `MESH_CONFIG` (default ./mesh-config.json)
- `SERVICE_PORT` (default 8080)
- `CONTROL_PLANE_URL` (default http://localhost:9090)

### Endpoints
- `GET /services` → List registered services
- `POST /traffic-rules` → Configure traffic routing
- `GET /metrics` → Service mesh metrics
- `POST /policies` → Apply security policies

### Testing
- Register multiple services and test discovery
- Configure traffic routing rules
- Monitor service-to-service communication

### Notes
- Implement sidecar proxy pattern
- Add service health checking
- Support multiple load balancing algorithms