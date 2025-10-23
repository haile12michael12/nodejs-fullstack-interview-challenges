## Challenge 31 – Performance Optimization

### Overview
Optimize a Node.js application for high performance using profiling tools, benchmarking, and optimization techniques.

### Features
- Performance profiling with clinic.js and 0x
- Memory leak detection and resolution
- CPU and memory usage optimization
- Database query optimization
- Caching strategies for performance

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `PORT` (default 3000)
- `DB_CONNECTION_LIMIT` (default 10)

### Endpoints
- `GET /users` → Get list of users (optimize this endpoint)
- `POST /users` → Create a new user
- `GET /reports` → Generate performance report

### Testing
- Use clinic.js to profile the application
- Run load tests with artillery or autocannon
- Monitor memory usage and identify leaks
- Compare performance before and after optimizations

### Notes
- Focus on identifying bottlenecks in code and database queries
- Implement proper caching strategies
- Use streaming for large data transfers
- Optimize garbage collection patterns