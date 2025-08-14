## Challenge 01 – Legacy gRPC Echo

### Overview
Build a minimal gRPC Echo service using legacy Node gRPC APIs. The server exposes a single `Echo` method that returns the same message it receives.

### Tech
- Backend: Node.js, gRPC
- Proto: `backend/proto/echo.proto`
- Frontend: React (simple UI to send echo requests)

### Project Structure
- `backend/`: gRPC server and proto
- `frontend/`: React client UI

### Prerequisites
- Node.js 18+
- npm or pnpm
- Optional: `grpcurl` for manual testing

### Setup
- Backend
  - cd `backend`
  - `npm install`

- Frontend
  - cd `frontend`
  - `npm install`

### Run
- Backend: in `backend`
  - `npm start` (or `npm run dev` if available)

- Frontend: in `frontend`
  - `npm start`

### Test with grpcurl (optional)
```bash
grpcurl -plaintext localhost:50051 list
grpcurl -plaintext -d '{"message":"hello"}' localhost:50051 echo.EchoService/Echo
```

### Notes
- Ensure the port in the frontend client matches the gRPC server gateway if using gRPC-Web.
