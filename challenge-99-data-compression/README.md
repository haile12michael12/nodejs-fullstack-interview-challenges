## Challenge 99 – Data Compression

### Overview
Add compression for API responses and static assets to reduce bandwidth usage and improve performance.

### Features
- HTTP response compression
- Static asset compression
- Compression algorithm selection
- Compression level configuration

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `COMPRESSION_LEVEL` (default 6)
- `COMPRESSION_THRESHOLD` (default 1024 bytes)
- `PORT` (default 3000)

### Endpoints
- All endpoints support compression
- `GET /compression/config` → Get compression settings
- `POST /compression/update` → Update compression config
- `GET /compression/stats` → Get compression statistics

### Testing
- Test response compression
- Verify static asset compression
- Check compression algorithm selection
- Validate compression level configuration

### Notes
- Use compression middleware
- Implement proper content encoding headers
- Handle compression for different content types
- Monitor compression performance impact