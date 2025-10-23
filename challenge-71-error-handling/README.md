## Challenge 71 – Error Handling

### Overview
Implement comprehensive error handling strategies with custom error classes and centralized error management.

### Features
- Custom error classes and inheritance
- Centralized error handling middleware
- Error logging and monitoring
- User-friendly error responses

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
- `ERROR_LOG_FILE` (default ./logs/error.log)
- `PORT` (default 3000)

### Endpoints
- `GET /error/:type` → Trigger specific error type
- `POST /validate` → Test validation errors
- `GET /handled` → Test handled errors
- `GET /unhandled` → Test unhandled errors

### Testing
- Test custom error classes
- Verify error middleware functionality
- Check error logging and reporting
- Test different error scenarios

### Notes
- Create custom error classes for different error types
- Implement centralized error handling middleware
- Add proper error logging with context
- Return appropriate HTTP status codes