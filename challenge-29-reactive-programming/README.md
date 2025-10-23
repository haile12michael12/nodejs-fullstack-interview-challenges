## Challenge 29 – Reactive Programming Patterns

### Overview
Build reactive systems using RxJS patterns with backpressure handling, stream composition, and error recovery.

### Features
- Observable streams and operators
- Backpressure handling strategies
- Stream composition and transformation
- Error handling and recovery
- Resource cleanup and cancellation

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `BUFFER_SIZE` (default 100)
- `PORT` (default 3000)

### Endpoints
- `GET /stream` → Real-time data stream
- `POST /operators` → Apply operators to stream
- `GET /backpressure` → Test backpressure handling
- `POST /cancel` → Cancel ongoing streams

### Testing
- Create and compose multiple streams
- Test backpressure with high-frequency data
- Verify error recovery mechanisms

### Notes
- Use RxJS for reactive programming
- Implement multiple backpressure strategies (buffer, drop, throttle)
- Handle stream lifecycle properly