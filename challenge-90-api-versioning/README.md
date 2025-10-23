## Challenge 90 – API Versioning

### Overview
Implement API versioning strategies to maintain backward compatibility while evolving the API.

### Features
- URL-based versioning
- Header-based versioning
- Version deprecation policies
- Migration path documentation

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `API_VERSION` (default v1)
- `VERSION_DEPRECATION_DAYS` (default 180)
- `PORT` (default 3000)

### Endpoints
- `GET /api/v1/users` → Version 1 users endpoint
- `GET /api/v2/users` → Version 2 users endpoint
- `GET /api/version` → Get current API version info
- `GET /api/deprecated` → List deprecated endpoints

### Testing
- Test URL-based versioning
- Verify header-based versioning
- Check version deprecation handling
- Validate migration path documentation

### Notes
- Implement multiple versioning strategies
- Add version-specific middleware
- Document API changes between versions
- Plan deprecation timelines