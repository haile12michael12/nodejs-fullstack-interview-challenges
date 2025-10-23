## Challenge 79 – CORS Security

### Overview
Implement CORS policies and security measures to control resource sharing between different origins.

### Features
- CORS configuration and middleware
- Origin whitelisting and validation
- HTTP method and header restrictions
- Credential handling and security

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `CORS_ORIGIN` (default *)
- `CORS_CREDENTIALS` (default false)
- `PORT` (default 3000)

### Endpoints
- All existing endpoints with CORS headers
- `GET /cors/config` → Get current CORS configuration
- `POST /cors/update` → Update CORS settings

### Testing
- Test CORS header implementation
- Verify origin validation
- Check preflight request handling
- Validate credential restrictions

### Notes
- Implement proper CORS middleware
- Use environment-specific CORS settings
- Handle preflight OPTIONS requests
- Prevent overly permissive CORS policies