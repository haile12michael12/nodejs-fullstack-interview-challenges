# Pagination Implementation Challenge

## Overview
This challenge implements a full-stack pagination solution with both offset-based and cursor-based pagination. The application includes a backend API for paginated data retrieval and a frontend dashboard for browsing paginated items.

## Features
- Offset-based pagination
- Cursor-based pagination
- Page size limits and validation
- Pagination metadata and navigation

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
- `PAGINATION_DEFAULT_LIMIT` - Default items per page (default: 10)
- `PAGINATION_MAX_LIMIT` - Maximum items per page (default: 100)

## API Endpoints
- `GET /items` → Get paginated items
- `GET /items?page=2&limit=20` → Custom pagination
- `GET /items/cursor?after=cursor` → Cursor-based pagination
- `GET /items/count` → Get total item count
- `GET /health` → Health check endpoint

## Testing
- Unit tests for pagination functionality
- Integration tests for API endpoints

```bash
cd backend
npm test
```