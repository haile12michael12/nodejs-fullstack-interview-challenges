## Challenge 04 – WebSocket Chat (Legacy Node)

### Overview
Real-time chat using `ws` on an older Node runtime. Implement simple room/broadcast logic. Frontend handles manual reconnection.

### Prerequisites
- Node.js 18+ (runtime target mimics legacy APIs)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Protocol
- JSON messages: `{ type: "join"|"message", room?, text? }`
- Server broadcasts to room members.

### Notes
- Handle `close` and `error` events; attempt exponential backoff on client reconnect.
