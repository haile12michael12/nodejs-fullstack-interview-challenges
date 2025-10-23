## Challenge 19 – Serverless Functions

### Overview
Create AWS Lambda-style serverless functions with local testing capabilities. Implement a function runtime that handles events, context, and cold starts.

### Features
- Serverless function runtime environment
- Event-driven execution model
- Cold start simulation and optimization
- Context object with timeout and metadata
- Local testing and debugging tools

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend` (starts local function runtime)
- Frontend: `npm start` in `frontend`

### Environment
- `FUNCTION_TIMEOUT` (default 30 seconds)
- `MEMORY_LIMIT` (default 512 MB)
- `PORT` (default 3000)

### Endpoints
- `POST /invoke/:functionName` → Invoke a serverless function
- `GET /functions` → List available functions
- `POST /deploy` → Deploy a new function

### Testing
- Deploy sample functions and invoke them
- Test timeout and error handling scenarios

### Notes
- Implement function isolation with VM or worker threads
- Handle environment variables per function
- Support multiple function handlers (HTTP, event-based)