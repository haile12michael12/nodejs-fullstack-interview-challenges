## Challenge 75 – Integration Testing

### Overview
Create integration tests for APIs and database interactions to ensure components work together correctly.

### Features
- API endpoint testing
- Database integration testing
- Test data management and cleanup
- Test environment configuration

### Prerequisites
- Node.js 18+
- Database for testing

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm run test:integration` in `backend`
- Frontend: `npm test` in `frontend`

### Environment
- `TEST_DATABASE_URL` (required for database tests)
- `INTEGRATION_TEST_TIMEOUT` (default 10000ms)

### Testing
- `npm run test:integration` → Run integration tests
- `npm run test:api` → Run API integration tests
- `npm run test:database` → Run database integration tests
- `npm run test:setup` → Set up test environment

### Notes
- Use Supertest for HTTP testing
- Implement test database setup and teardown
- Use factory patterns for test data
- Test error scenarios and edge cases