## Challenge 80 – Request Logging

### Overview
Add request logging and monitoring to track API usage, performance, and debugging information.

### Features
- HTTP request/response logging
- Performance metrics and timing
- Request ID tracking
- Log filtering and search

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `LOG_LEVEL` (default info)
- `REQUEST_LOG_FORMAT` (default combined)
- `PORT` (default 3000)

### Endpoints
- `GET /logs/requests` → Get request logs
- `GET /logs/requests/:id` → Get specific request log
- `POST /logs/search` → Search logs by criteria
- All API endpoints generate logs

### Testing
- Verify request logging middleware
- Test log format customization
- Check performance timing metrics
- Validate log filtering and search

### Notes
- Use morgan or similar for HTTP logging
- Implement request ID generation and tracking
- Add response time measurements
- Support structured logging formats