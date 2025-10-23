## Challenge 74 – Unit Testing

### Overview
Write comprehensive unit tests for Node.js applications with coverage reporting and test organization.

### Features
- Test suite organization and structure
- Mocking and stubbing dependencies
- Code coverage reporting
- Test lifecycle management

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm test` in `backend`
- Frontend: `npm test` in `frontend`

### Environment
- `TEST_ENV` (default test)
- `COVERAGE_THRESHOLD` (default 80%)

### Testing
- `npm test` → Run all tests
- `npm run test:watch` → Run tests in watch mode
- `npm run test:coverage` → Run tests with coverage
- `npm run test:unit` → Run unit tests only

### Notes
- Use Jest or Mocha for testing framework
- Implement test doubles (mocks, spies, stubs)
- Organize tests by module or feature
- Maintain high code coverage