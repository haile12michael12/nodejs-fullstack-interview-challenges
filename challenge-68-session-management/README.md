## Challenge 68 – Session Management

### Overview
Build session-based authentication systems with secure session storage and management.

### Features
- Session creation and validation
- Secure session storage (Redis or database)
- Session timeout and renewal
- Concurrent session management

### Prerequisites
- Node.js 18+
- Redis or database for session storage

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `SESSION_SECRET` (required)
- `SESSION_TTL` (default 3600 seconds)
- `REDIS_URL` (optional, for Redis session storage)
- `PORT` (default 3000)

### Endpoints
- `POST /login` → Create new session
- `GET /profile` → Access protected resource with session
- `POST /logout` → Destroy session
- `GET /sessions` → List active sessions

### Testing
- Test session creation and validation
- Verify session timeout functionality
- Test concurrent session limits
- Validate session cleanup

### Notes
- Use express-session or implement custom session management
- Store session data securely with encryption
- Implement session fixation protection
- Add session renewal for active users