## Challenge 12 – Headless Screenshot Service

### Overview
Provide an endpoint that captures screenshots of URLs using Puppeteer. Optimize Docker image size.

### Prerequisites
- Node.js 18+
- Chromium dependencies (handled by Docker)

### Run
- Backend: `cd backend && npm install && npm start`
- Frontend: `cd frontend && npm install && npm start`

### API
- `POST /screenshot` with `{ url, width?, height? }`

### Notes
- Use `--no-sandbox` flags in containers as needed.
