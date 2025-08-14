## Challenge 07 – Markdown Preview API

### Overview
Provide an endpoint that converts a subset of Markdown (headers and lists) to HTML. No external Markdown or sanitize libraries.

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start`
- Frontend: `npm start`

### API
- `POST /render` with `{ markdown }`
- Returns sanitized HTML for the supported subset

### Notes
- Implement minimal parsing and safe escaping manually.
