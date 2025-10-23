## Challenge 81 – Data Validation

### Overview
Validate data with schemas and constraints to ensure data integrity and prevent invalid data from being processed.

### Features
- Schema-based data validation
- Custom validation rules
- Error message customization
- Validation middleware integration

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
- `POST /validate/user` → Validate user data
- `POST /validate/product` → Validate product data
- `GET /validation/rules` → Get validation rules
- All data submission endpoints include validation

### Testing
- Test schema validation implementation
- Verify custom validation rules
- Check error message formatting
- Validate nested object validation

### Notes
- Use Joi, Yup, or Zod for schema validation
- Implement validation at both API and model levels
- Provide clear error messages for validation failures
- Support conditional validation rules