## Challenge 89 – Data Import

### Overview
Implement a comprehensive data import system that supports multiple file formats (CSV, JSON, Excel) with validation, error handling, and progress tracking.

### Features
- Multiple file format support (CSV, JSON, Excel)
- Data validation during import
- Import progress tracking
- Error handling and reporting
- Template download functionality
- MongoDB integration for storing import records

### Prerequisites
- Node.js 18+
- MongoDB (for development)

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`

### Run
- Docker Compose (recommended): `docker-compose up -d`
- Backend only: `cd backend && npm run dev`
- Frontend only: `cd frontend && npm start`

### Environment
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `UPLOAD_DIR` - Directory for uploaded files
- `MAX_FILE_SIZE` - Maximum file size for uploads (default: 50MB)

### API Endpoints
- `POST /api/import/upload` - Upload a data file
- `GET /api/import/status/:importId` - Get import status
- `GET /api/import/errors/:importId` - Get import errors
- `GET /api/import/template/:type` - Download template file
- `GET /api/import/imports` - List all imports
- `GET /health` - Health check endpoint

### Directory Structure
- `backend/` - Node.js Express API with MongoDB integration
- `frontend/` - React dashboard application
- `docker-compose.yml` - Docker configuration for MongoDB, backend, and frontend

### Testing
- Unit tests: `cd backend && npm test`
- Manual testing through dashboard UI

### Notes
- Uses streams for efficient large file processing
- Implements data validation during import
- Provides real-time import progress tracking
- Handles partial import failures gracefully