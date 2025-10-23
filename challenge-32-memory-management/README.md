## Challenge 32 – Memory Management

### Overview
Implement efficient memory management techniques and detect memory leaks in Node.js applications.

### Features
- Memory leak detection and analysis
- Heap snapshot analysis
- Garbage collection optimization
- Efficient data structure usage
- Memory pooling techniques

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
- `MEMORY_LIMIT` (default 512MB)

### Endpoints
- `GET /memory-stats` → Get current memory usage statistics
- `POST /allocate` → Allocate memory (for testing)
- `POST /leak` → Intentionally create a memory leak (for testing)
- `POST /cleanup` → Force garbage collection

### Testing
- Use heap snapshots to identify memory leaks
- Monitor memory usage over time
- Test with large data sets
- Implement memory pooling for object reuse

### Notes
- Use weak references where appropriate
- Implement proper cleanup for event listeners
- Use object pooling for frequently created objects
- Monitor memory growth patterns