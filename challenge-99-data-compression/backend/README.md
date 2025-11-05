# Data Compression Backend

## Overview
This is the backend service for the data compression challenge. It provides APIs for compressing data using different algorithms and tracking compression statistics.

## Features
- Data compression using GZIP and Brotli
- Compression statistics tracking
- RESTful API endpoints
- Docker containerization

## API Endpoints
- `POST /api/compression/compress` - Compress data
- `GET /api/compression/stats` - Get compression statistics
- `GET /health` - Health check endpoint

## Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (default: development)
- `COMPRESSION_LEVEL` - Compression level (default: 6)
- `COMPRESSION_THRESHOLD` - Compression threshold in bytes (default: 1024)

## Installation
```bash
npm install
```

## Running the Service
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Testing
```bash
npm test
```