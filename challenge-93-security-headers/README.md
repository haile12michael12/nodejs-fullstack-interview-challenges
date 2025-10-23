## Challenge 93 – Security Headers

### Overview
Add security headers to HTTP responses to protect against common web vulnerabilities.

### Features
- HTTP security headers implementation
- Content Security Policy (CSP)
- XSS and clickjacking protection
- Security header customization

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `CSP_POLICY` (default strict)
- `SECURITY_HEADERS` (default enabled)
- `PORT` (default 3000)

### Endpoints
- All endpoints include security headers
- `GET /security/config` → Get security header configuration
- `POST /security/update` → Update security headers
- `GET /security/report` → Get security report

### Testing
- Test security header implementation
- Verify CSP policy enforcement
- Check XSS protection headers
- Validate clickjacking protection

### Notes
- Implement Helmet.js for security headers
- Customize headers for different environments
- Add reporting for security violations
- Handle inline script restrictions