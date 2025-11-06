# Data Import Frontend

## Overview
This is the frontend dashboard for the data import challenge. It provides a user interface for uploading files, monitoring import progress, and viewing errors.

## Features
- File upload interface for CSV, JSON, and Excel files
- Import progress tracking with visual indicators
- Error display for failed rows
- Template download for supported formats
- Import history listing

## Components
- **FileUpload** - Handles file selection and upload
- **ImportProgress** - Displays import progress with status
- **ErrorTable** - Shows row-level errors
- **ImportDashboard** - Main dashboard page

## API
- **importApi.js** - Axios client for communicating with backend services
- **useImportStatus.js** - Custom hook for polling import status

## Installation
```bash
npm install
```

## Running the Service
```bash
# Development mode
npm run start

# Production build
npm run build
```

## Development
The frontend is built with React and Vite, running on port 3001. It proxies API requests to the backend service running on port 3000.