## Challenge 21 – Circuit Breaker Pattern

### Overview
Implement the circuit breaker pattern for building resilient microservices that gracefully handle downstream service failures.

### Features
- Circuit breaker state management (Closed, Open, Half-Open)
- Failure threshold and timeout configuration
- Metrics collection and monitoring
- Fallback mechanism implementation
- Automatic recovery detection

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `FAILURE_THRESHOLD` (default 5)
- `TIMEOUT_MS` (default 60000)
- `PORT` (default 3000)

### Endpoints
- `GET /service-call` → Protected service call with circuit breaker
- `GET /circuit-state` → Get current circuit breaker state
- `POST /circuit-reset` → Manually reset circuit breaker

### Testing
- Simulate service failures and observe circuit breaking
- Test fallback mechanisms
- Monitor state transitions

### Notes
- Implement exponential backoff for retries
- Track latency and error metrics
- Provide health check endpoints