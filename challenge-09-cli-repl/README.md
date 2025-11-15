## Challenge 09 – Fullstack REPL Application

### Overview
This challenge includes both a CLI REPL and a web-based frontend for managing key-value pairs. The application supports commands like `create`, `list`, `update`, and `delete` through both interfaces.

### Features
- CLI REPL interface with commands for data management
- Web frontend with React for visual data management
- REST API for communication between frontend and backend
- Docker support for easy deployment
- Persistent storage using JSON files

### Prerequisites
- Node.js 18+
- Docker (optional)

### Run CLI REPL Locally
1. `cd backend && npm install`
2. `npm start` to launch the CLI REPL

### Run Web Frontend Locally
1. `cd backend && npm install`
2. `npm run server` to start the backend API
3. In a new terminal, `cd frontend && npm install`
4. `npm run dev` to start the frontend development server

### Docker
- Build and run CLI REPL: `docker run -it --rm repl`
- Build and run fullstack app: `docker-compose up`
- Frontend will be available at http://localhost:3001
- Backend API will be available at http://localhost:3000

### API Endpoints
- `GET /api/items` - List all items
- `GET /api/items/:key` - Get item by key
- `POST /api/items` - Create new item
- `PUT /api/items/:key` - Update item
- `DELETE /api/items/:key` - Delete item
- `DELETE /api/items` - Clear all items
- `GET /api/stats` - Get statistics

### Notes
- Data is persisted to a JSON file
- Both CLI and web interfaces share the same data store
