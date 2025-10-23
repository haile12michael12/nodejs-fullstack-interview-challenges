## Challenge 36 – Security Hardening

### Overview
Implement comprehensive security measures including protection against XSS, CSRF, injection attacks, and other vulnerabilities.

### Features
- Input validation and sanitization
- Protection against XSS and CSRF attacks
- SQL/NoSQL injection prevention
- Authentication and authorization hardening
- Security headers and CORS configuration

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `JWT_SECRET` (required)
- `CORS_ORIGIN` (default *)
- `PORT` (default 3000)

### Endpoints
- `POST /login` → Secure login endpoint
- `POST /data` → Protected data submission
- `GET /profile` → User profile with security headers
- `POST /transfer` → Financial transaction (CSRF protected)

### Testing
- Test for common vulnerabilities (OWASP Top 10)
- Validate input sanitization
- Test authentication and session management
- Verify security headers are properly set

### Notes
- Implement Content Security Policy (CSP)
- Use helmet.js for security headers
- Apply proper input validation and escaping
- Implement rate limiting for brute force protection