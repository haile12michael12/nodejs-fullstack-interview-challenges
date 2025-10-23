## Challenge 69 – File System Operations

### Overview
Work with Node.js file system APIs to perform common file operations securely and efficiently.

### Features
- File reading and writing operations
- Directory manipulation and traversal
- File metadata and permissions
- Secure file handling

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `UPLOAD_DIR` (default ./uploads)
- `MAX_FILE_SIZE` (default 10MB)
- `PORT` (default 3000)

### Endpoints
- `POST /files` → Upload and save file
- `GET /files/:filename` → Retrieve file
- `DELETE /files/:filename` → Delete file
- `GET /files` → List files in directory

### Testing
- Test file upload and storage
- Verify file reading and streaming
- Test directory operations
- Validate file security measures

### Notes
- Use fs.promises for async file operations
- Implement proper error handling for file operations
- Add file type validation and size limits
- Prevent directory traversal attacks