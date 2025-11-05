## Challenge 99 – Data Compression

### Overview
Implement data compression for API responses and static assets to reduce bandwidth usage and improve performance.

### Features
- HTTP response compression using GZIP and Brotli
- Static asset compression
- Compression statistics tracking
- Dashboard for monitoring compression performance
- RESTful API for compression operations

### Prerequisites
- Node.js 18+
- Docker and Docker Compose (optional)

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`

### Run
- Start all services with Docker: `docker-compose up`
- Start backend only: `cd backend && npm run dev`
- Start frontend only: `cd frontend && npm run start`

### Environment
- `COMPRESSION_LEVEL` (default 6)
- `COMPRESSION_THRESHOLD` (default 1024 bytes)
- `PORT` (default 3000)

### API Endpoints
- `POST /api/compression/compress` → Compress data
- `GET /api/compression/stats` → Get compression statistics
- `GET /health` → Health check

### Directory Structure
- `backend/` - Node.js Express API with compression middleware
- `frontend/` - React dashboard application
- `docker-compose.yml` - Multi-container orchestration

### Testing
- Unit tests: `cd backend && npm test`
- Manual testing through dashboard UI

### Notes
- Uses Express compression middleware
- Implements custom compression statistics tracking
- Dashboard provides real-time compression metrics
- Supports both GZIP and Brotli compression algorithms