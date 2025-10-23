## Challenge 78 – API Documentation

### Overview
Create automated API documentation with interactive examples and schema validation.

### Features
- OpenAPI/Swagger specification generation
- Interactive API documentation UI
- Request/response examples
- Schema validation and testing

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `DOCS_PATH` (default /docs)
- `PORT` (default 3000)

### Endpoints
- `GET /docs` → API documentation UI
- `GET /docs/json` → OpenAPI specification JSON
- `GET /docs/yaml` → OpenAPI specification YAML
- All existing API endpoints are documented

### Testing
- Verify API documentation generation
- Test interactive documentation UI
- Validate schema definitions
- Check example requests and responses

### Notes
- Use Swagger UI or Redoc for documentation UI
- Implement JSDoc or similar for code comments
- Automate documentation generation from code
- Include authentication information in docs