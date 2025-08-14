## Challenge 03 – SSE Live Logs

### Overview
Stream server logs to the browser using Server-Sent Events (SSE). No SSE libraries; use raw HTTP with `text/event-stream`.

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### How it works
- Endpoint: `GET /events` keeps the connection open and periodically flushes `data: ...\n\n` lines.
- Frontend uses `EventSource` to display log lines.

### Testing
- Open the app, trigger logs on the server, confirm they stream live.

### Notes
- Ensure proper headers: `Cache-Control: no-cache`, `Connection: keep-alive`.
