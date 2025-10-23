## Challenge 84 – Search and Filtering

### Overview
Build search and filtering functionality to help users find relevant data efficiently.

### Features
- Full-text search implementation
- Field-based filtering
- Sorting and ordering
- Search result ranking

### Prerequisites
- Node.js 18+
- Database with searchable data

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `SEARCH_MIN_LENGTH` (default 3)
- `SEARCH_MAX_RESULTS` (default 100)
- `PORT` (default 3000)

### Endpoints
- `GET /search?q=query` → Search across all fields
- `GET /items?filter[field]=value` → Filter by field
- `GET /items?sort=field&order=asc` → Sort results
- `GET /search/advanced` → Advanced search with multiple criteria

### Testing
- Test full-text search functionality
- Verify field-based filtering
- Check sorting and ordering
- Validate search result pagination

### Notes
- Implement database-level search when possible
- Add indexing for frequently searched fields
- Support partial matching and wildcards
- Handle special characters in search queries