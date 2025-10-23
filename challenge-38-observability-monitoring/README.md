## Challenge 38 – Observability and Monitoring

### Overview
Implement comprehensive monitoring, logging, and alerting systems for production applications.

### Features
- Structured logging with levels and contexts
- Metrics collection and visualization
- Distributed tracing integration
- Health checks and uptime monitoring
- Alerting and notification systems

### Prerequisites
- Node.js 18+
- Prometheus and Grafana (optional)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `LOG_LEVEL` (default info)
- `METRICS_PORT` (default 9090)
- `PORT` (default 3000)

### Endpoints
- `GET /metrics` → Prometheus metrics endpoint
- `GET /health` → Health check endpoint
- `GET /logs` → Recent log entries
- `POST /alert` → Trigger alert for testing

### Testing
- Monitor application metrics in real-time
- Test health check endpoints
- Verify log aggregation and filtering
- Test alerting mechanisms

### Notes
- Implement centralized logging
- Use OpenTelemetry for metrics and tracing
- Set up proper alert thresholds
- Monitor resource utilization