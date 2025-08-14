## Challenge 06 – Custom GraphQL Server

### Overview
Build a minimal GraphQL server using the `graphql` package directly. No Apollo or `express-graphql` helpers.

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Usage
- Query endpoint: typically `POST /graphql` with `{ query, variables }`.
- Frontend includes a simple query runner UI.

### Notes
- Implement schema, resolvers, and validation manually using `graphql` primitives.
