## Challenge 05 – REST File Uploader + Security Scan

### Overview
Implement file uploads over multipart/form-data using raw parsing (no `multer`). Perform basic validation and simple scanning.

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### API
- `POST /upload` with `file` field
- Response includes file metadata and scan result

### Notes
- Enforce file size limits, extension whitelist, and content-type checks.
