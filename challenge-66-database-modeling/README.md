## Challenge 66 – Database Modeling

### Overview
Design and implement database models with relationships, constraints, and indexing for a typical web application.

### Features
- Relational database schema design
- Model relationships (one-to-one, one-to-many, many-to-many)
- Database constraints and validation
- Indexing strategies for performance

### Prerequisites
- Node.js 18+
- PostgreSQL or MySQL

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `DATABASE_URL` (required)
- `PORT` (default 3000)

### Endpoints
- `POST /users` → Create a new user
- `GET /users/:id` → Get user with related data
- `POST /posts` → Create a new post
- `GET /posts` → Get posts with author information

### Testing
- Create database schema with proper relationships
- Test model constraints and validations
- Verify query performance with indexing
- Test data integrity with foreign keys

### Notes
- Use an ORM like Sequelize or Prisma
- Implement proper data validation at the model level
- Add indexes for frequently queried fields
- Handle database migrations