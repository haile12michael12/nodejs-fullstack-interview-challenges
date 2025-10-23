## Challenge 92 – Performance Monitoring

### Overview
Implement performance monitoring to track application metrics and identify bottlenecks.

### Features
- Response time monitoring
- Database query performance tracking
- Memory and CPU usage monitoring
- Custom metric collection

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `METRICS_PORT` (default 9090)
- `PERFORMANCE_LOG_LEVEL` (default info)
- `PORT` (default 3000)

### Endpoints
- `GET /metrics` → Application metrics
- `GET /performance` → Performance statistics
- `GET /slow-queries` → Slow database queries
- `POST /metrics/custom` → Custom metric recording

### Testing
- Test response time monitoring
- Verify database performance tracking
- Check resource usage monitoring
- Validate custom metric collection

### Notes
- Use Prometheus client library
- Implement custom metrics for business logic
- Add performance logging middleware
- Monitor garbage collection performance