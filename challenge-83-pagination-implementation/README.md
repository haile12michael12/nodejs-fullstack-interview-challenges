## Challenge 83 – Pagination Implementation

### Overview
Implement pagination for large datasets to improve performance and user experience.

### Features
- Offset-based pagination
- Cursor-based pagination
- Page size limits and validation
- Pagination metadata and navigation

### Prerequisites
- Node.js 18+
- Database with large dataset

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `PAGINATION_DEFAULT_LIMIT` (default 10)
- `PAGINATION_MAX_LIMIT` (default 100)
- `PORT` (default 3000)

### Endpoints
- `GET /items` → Get paginated items
- `GET /items?page=2&limit=20` → Custom pagination
- `GET /items/cursor?after=cursor` → Cursor-based pagination
- `GET /items/count` → Get total item count

### Testing
- Test offset-based pagination
- Verify cursor-based pagination
- Check page size validation
- Validate pagination metadata

### Notes
- Implement both offset and cursor-based pagination
- Add pagination to database queries
- Include total count and navigation links
- Handle edge cases like empty pages