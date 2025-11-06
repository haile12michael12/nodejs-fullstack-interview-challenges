## Challenge 32 – Memory Management

### Overview
Implement comprehensive memory management techniques including leak detection, heap analysis, garbage collection optimization, and efficient data structure usage in Node.js applications.

### Features
- Memory leak detection and analysis using memwatch-next
- Heap snapshot capture and analysis
- Garbage collection optimization and manual triggering
- Efficient data structure usage and object pooling
- Memory statistics monitoring
- CLI tools for memory management operations

### Prerequisites
- Node.js 18+
- Docker and Docker Compose (optional)

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`
3. Install global tools: `npm install -g artillery` (for load testing)

### Run
- Docker Compose (recommended): `docker-compose up -d`
- Local development: `./scripts/run-local.sh`
- Backend only: `cd backend && node --expose-gc src/index.js start`

### Environment
- `PORT` - Server port (default: 3000)
- `HEAP_SNAPSHOT_DIR` - Directory for heap snapshots (default: ./snapshots)
- `MAX_HEAP_SIZE` - Maximum heap size in MB (default: 512)
- `GC_INTERVAL` - Garbage collection interval in ms (default: 30000)

### API Endpoints
- `GET /api/memory-stats` → Get current memory usage statistics
- `POST /api/allocate` → Allocate memory (for testing)
- `POST /api/leak` → Intentionally create a memory leak (for testing)
- `POST /api/cleanup` → Force garbage collection
- `GET /health` → Health check endpoint

### CLI Commands
- `node src/index.js start` → Start the Express server
- `node src/index.js snapshot` → Capture heap snapshot
- `node src/index.js profile` → Run memory profiling

### Directory Structure
- `backend/` - Node.js Express application with memory management features
- `frontend/` - React dashboard for monitoring memory usage
- `tooling/` - Load testing, profiling, and analysis tools
- `docs/` - Documentation on memory management techniques
- `scripts/` - Automation scripts for common tasks

### Testing
- Smoke tests: `cd backend && npm test`
- Load testing: `./scripts/produce-load.sh`
- Memory leak detection: `./tooling/load-test/scripts/leak-run.sh`
- Heap analysis: `node tooling/analyze/heap-analyze.js <snapshot-file>`

### Notes
- Run with `--expose-gc` flag to enable manual garbage collection
- Use weak references where appropriate to prevent memory leaks
- Implement proper cleanup for event listeners and intervals
- Use object pooling for frequently created objects
- Monitor memory growth patterns with heap snapshots