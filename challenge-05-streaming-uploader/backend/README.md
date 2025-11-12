# Streaming File Uploader - Backend

This is the backend for the streaming file uploader application. It provides a REST API for uploading files with streaming parsing and security scanning.

## Features

- Streaming multipart data parsing
- File security scanning
- File type validation
- File size validation
- File listing and deletion

## API Endpoints

- `POST /upload` - Upload a file
- `GET /files` - List uploaded files
- `DELETE /delete?filename=<name>` - Delete a file

## Configuration

The application can be configured using environment variables:

- `PORT` - Server port (default: 3000)
- `MAX_FILE_SIZE` - Maximum file size in bytes (default: 10485760 (10MB))
- `UPLOAD_DIR` - Upload directory (default: 'uploads')

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The server will start on port 3000 by default.