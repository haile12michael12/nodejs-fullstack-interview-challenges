## Challenge 09 – Node.js CLI REPL

### Overview
Build a small REPL with commands like `create`, `list`, and `delete`. Ship via Docker so `docker run` starts the REPL.

### Prerequisites
- Node.js 18+
- Docker (optional)

### Run Locally
- `cd backend && npm install`
- `npm start` to launch the REPL

### Docker
- Build: `docker build -t repl .`
- Run: `docker run -it --rm repl`

### Notes
- Persist data to a JSON file or in-memory store as needed.
