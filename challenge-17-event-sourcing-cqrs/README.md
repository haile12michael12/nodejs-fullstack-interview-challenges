## Challenge 17 – Event Sourcing with CQRS

### Overview
Implement an event-sourced system with Command Query Responsibility Segregation (CQRS) pattern. Separate read and write models with event store persistence.

### Features
- Event sourcing implementation
- CQRS pattern with separate read/write models
- Event store with persistence
- Event replay and projection mechanisms
- Snapshotting for performance optimization

### Prerequisites
- Node.js 18+
- MongoDB or in-memory storage

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `DATABASE_URL` (default mongodb://localhost:27017/events)
- `PORT` (default 3000)

### Endpoints
- `POST /commands/create-user` → Creates a new user
- `POST /commands/update-user` → Updates user information
- `GET /queries/users` → Gets all users
- `GET /queries/user/:id` → Gets a specific user

### Testing
- Use the frontend UI to create and query users
- Check the event store for persisted events

### Notes
- Implement event store with append-only semantics
- Use separate models for commands (write) and queries (read)
- Handle event versioning for schema evolution