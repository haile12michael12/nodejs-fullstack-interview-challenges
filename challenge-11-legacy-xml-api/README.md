## Challenge 11 – Legacy XML API

### Overview
Serve and consume XML only. Build endpoints that return and accept XML (no JSON). Frontend parses XML responses.

### Prerequisites
- Node.js 18+

### Run
- Backend: `cd backend && npm install && npm start`
- Frontend: `cd frontend && npm install && npm start`

### Endpoints
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/{id}` - Get product by ID
- `PUT /api/products/{id}` - Update product by ID
- `DELETE /api/products/{id}` - Delete product by ID

### Notes
- Set `Content-Type: application/xml` consistently.
- All requests and responses use XML format only.
- Frontend uses DOMParser to parse XML responses.