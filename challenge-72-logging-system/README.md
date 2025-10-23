## Challenge 72 – Logging System

### Overview
Build structured logging systems with multiple transports, log levels, and monitoring capabilities.

### Features
- Structured logging with metadata
- Multiple log transports (console, file, external services)
- Log level filtering and configuration
- Log rotation and retention

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
- `LOG_TRANSPORT` (default console,file)
- `LOG_FILE` (default ./logs/app.log)
- `PORT` (default 3000)

### Endpoints
- `GET /logs` → Retrieve recent log entries
- `POST /logs/level` → Change log level dynamically
- `GET /logs/:level` → Filter logs by level
- `POST /logs/test` → Generate test log entries

### Testing
- Test structured log output
- Verify multiple transport functionality
- Test log level filtering
- Validate log rotation

### Notes
- Use winston or bunyan for logging
- Implement request ID tracking
- Add context to log entries
- Support JSON and text log formats