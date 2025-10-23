## Challenge 82 – File Upload Validation

### Overview
Secure file upload with validation to prevent malicious files and ensure only allowed file types are accepted.

### Features
- File type and extension validation
- File size limits and restrictions
- Virus scanning and security checks
- Secure file storage and naming

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `UPLOAD_MAX_SIZE` (default 10MB)
- `UPLOAD_ALLOWED_TYPES` (default image/*)
- `UPLOAD_DIR` (default ./uploads)
- `PORT` (default 3000)

### Endpoints
- `POST /upload` → Upload and validate file
- `GET /files/:id` → Retrieve uploaded file
- `DELETE /files/:id` → Delete uploaded file
- `GET /files` → List uploaded files

### Testing
- Test file type validation
- Verify file size restrictions
- Check secure file naming
- Validate error handling for invalid files

### Notes
- Implement file type checking with MIME types
- Add file extension validation
- Use temporary file storage for validation
- Prevent directory traversal attacks