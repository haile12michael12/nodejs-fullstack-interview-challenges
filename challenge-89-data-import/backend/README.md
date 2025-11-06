# Data Import Backend

## Overview
This is the backend service for the data import challenge. It provides APIs for uploading and processing CSV, JSON, and Excel files.

## Features
- File upload for CSV, JSON, and Excel formats
- Data validation and error reporting
- Import status tracking
- Template download for supported formats
- MongoDB integration for storing import records and errors

## API Endpoints
- `POST /api/import/upload` - Upload a data file
- `GET /api/import/status/:importId` - Get import status
- `GET /api/import/errors/:importId` - Get import errors
- `GET /api/import/template/:type` - Download template file
- `GET /api/import/imports` - List all imports
- `GET /health` - Health check endpoint

## Environment Variables
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `UPLOAD_DIR` - Directory for uploaded files
- `MAX_FILE_SIZE` - Maximum file size for uploads

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