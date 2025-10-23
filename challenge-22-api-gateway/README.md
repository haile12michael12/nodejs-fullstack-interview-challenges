## Challenge 22 – Custom API Gateway

### Overview
Build a custom API gateway that handles routing, rate limiting, authentication, and request/response transformation for microservices.

### Features
- Path-based and host-based routing
- Request/response transformation
- Authentication and authorization middleware
- Rate limiting with Redis
- Load balancing strategies
- Logging and monitoring

### Prerequisites
- Node.js 18+
- Redis for rate limiting

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `REDIS_URL` (default redis://localhost:6379)
- `RATE_LIMIT` (default 100 requests/minute)
- `PORT` (default 3000)

### Endpoints
- All downstream service endpoints are routed through the gateway
- `GET /gateway/routes` → List configured routes
- `POST /gateway/routes` → Add new route configuration

### Testing
- Configure routes and test service routing
- Verify rate limiting behavior
- Test authentication middleware

### Notes
- Implement service discovery (static config or dynamic)
- Support multiple load balancing algorithms
- Add request/response logging for debugging