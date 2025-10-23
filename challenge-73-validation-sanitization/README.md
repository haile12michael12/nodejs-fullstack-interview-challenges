## Challenge 73 – Validation and Sanitization

### Overview
Implement input validation and sanitization to protect against malicious data and ensure data integrity.

### Features
- Request body validation
- Query parameter validation
- Data sanitization and cleaning
- Custom validation rules

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `VALIDATION_STRICTNESS` (default medium)
- `PORT` (default 3000)

### Endpoints
- `POST /users` → Validate user registration data
- `GET /search` → Validate search parameters
- `POST /posts` → Validate post content
- `PUT /users/:id` → Validate user update data

### Testing
- Test validation rule implementation
- Verify data sanitization
- Check error response formatting
- Test custom validation rules

### Notes
- Use libraries like Joi or express-validator
- Implement both client-side and server-side validation
- Sanitize user input to prevent XSS
- Return clear validation error messages