# Challenge 78 – API Documentation

## Overview
Create automated API documentation with interactive examples and schema validation.

## Features
- OpenAPI/Swagger specification generation
- Interactive API documentation UI
- Request/response examples
- Schema validation and testing
- Real-time API health monitoring

## Prerequisites
- Node.js 18+

## Setup
1. Backend: `cd backend && npm install`
2. Frontend: `cd frontend && npm install`

## Run
1. Start the backend: `cd backend && npm start`
2. Start the frontend: `cd frontend && npm start`

## Environment
- `DOCS_PATH` (default /docs)
- `PORT` (default 3000)

## Endpoints
- `GET /docs` → API documentation UI
- `GET /docs/json` → OpenAPI specification JSON
- `GET /docs/yaml` → OpenAPI specification YAML
- All existing API endpoints are documented

## Testing
- Verify API documentation generation
- Test interactive documentation UI
- Validate schema definitions
- Check example requests and responses

## Notes
- Use Swagger UI for documentation UI
- Implement JSDoc for code comments
- Automate documentation generation from code
- Include authentication information in docs

## Docker
To run with Docker:
1. `docker-compose up --build`
2. Access frontend at http://localhost:3001
3. Access backend API at http://localhost:3000