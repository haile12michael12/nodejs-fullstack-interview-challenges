## Challenge 89 – Data Import

### Overview
Build data import functionality from files (CSV, JSON, Excel) with validation and error handling.

### Features
- Multiple file format support
- Data validation during import
- Import progress tracking
- Error handling and reporting

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `IMPORT_MAX_FILE_SIZE` (default 50MB)
- `IMPORT_BATCH_SIZE` (default 1000)
- `PORT` (default 3000)

### Endpoints
- `POST /import` → Import data from file
- `GET /import/:id` → Get import status
- `GET /import/:id/errors` → Get import errors
- `POST /import/template` → Download import template

### Testing
- Test CSV import functionality
- Verify JSON import processing
- Check Excel file handling
- Validate import error reporting

### Notes
- Use streams for large file processing
- Implement data validation during import
- Add import progress tracking
- Handle partial import failures