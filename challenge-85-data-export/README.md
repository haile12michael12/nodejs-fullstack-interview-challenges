# Data Export Challenge

## Overview
This challenge implements a full-stack data export solution with support for multiple formats (CSV, JSON, Excel). The application includes a backend API for exporting data and a frontend dashboard for managing exports.

## Features
- Multiple export format support (CSV, JSON, Excel)
- Export customization and filtering
- Large dataset handling
- Export progress tracking
- Advanced export options

## Prerequisites
- Node.js 18+

## Setup

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Running the Application

### Backend
```bash
cd backend
npm start
# or for development
npm run dev
```

### Frontend
```bash
cd frontend
npm start
# or for production
npm run preview
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3000)
- `EXPORT_MAX_RECORDS` - Maximum records for export (default: 10000)
- `EXPORT_FORMATS` - Supported formats (default: csv,json,excel)
- `REDIS_URL` - Redis connection URL (optional)

## API Endpoints
- `GET /export?format=csv` → Export data as CSV
- `GET /export?format=json` → Export data as JSON
- `POST /export/advanced` → Advanced export with filters
- `GET /export/status/:id` → Check export progress
- `GET /health` → Health check endpoint

## Testing
- Unit tests for export functionality
- Integration tests for API endpoints

```bash
cd backend
npm test
```