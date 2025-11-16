# Challenge 11: Legacy XML API

Implement a legacy XML-only API server and client that handles product management operations using pure XML for requests and responses.

## Overview

This challenge involves building a complete system with:
1. A backend XML-only API server
2. A frontend React client that communicates with the API using XML

All communication between the client and server must use XML format exclusively - no JSON is allowed.

## Requirements

### Backend (Node.js HTTP Server)

- XML-only endpoints (no JSON support)
- Full CRUD operations for products:
  - GET /api/products - Get all products
  - POST /api/products - Create new product
  - GET /api/products/{id} - Get product by ID
  - PUT /api/products/{id} - Update product by ID
  - DELETE /api/products/{id} - Delete product by ID
- XML validation and parsing
- Proper error handling with XML responses
- Rate limiting
- Request logging
- CORS support for frontend integration

### Frontend (React Client)

- XML-only communication with backend API
- DOMParser-based XML parsing
- React components for product management
- XML to JSON conversion utilities
- JSON to XML conversion utilities

## Project Structure

```
challenge-11-legacy-xml-api/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   │
│   ├── controllers/
│   │   └── productController.js
│   │
│   ├── routes/
│   │   └── productRoutes.js
│   │
│   ├── xml/
│   │   ├── xmlBuilder.js
│   │   ├── xmlParser.js
│   │   └── xmlValidator.js
│   │
│   ├── middleware/
│   │   └── xmlOnly.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   ├── httpHelpers.js
│   │   └── rateLimiter.js
│   │
│   ├── data/
│   │   └── products.json
│   │
│   └── README.md
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   │
│   │   ├── api/
│   │   │   └── xmlClient.js
│   │   │
│   │   ├── hooks/
│   │   │   └── useXML.js
│   │   │
│   │   ├── components/
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── XMLViewer.jsx
│   │   │
│   │   └── utils/
│   │       ├── xmlToJson.js
│   │       └── jsonToXml.js
│   │
│   └── README.md
│
└── README.md
```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend client:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser to http://localhost:5173 to use the application.

## Testing

Run the backend test suite:
```bash
cd backend
npm test
```

## Implementation Details

### XML Format

All requests and responses use the following XML format:

**Product XML:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<product>
  <id>1</id>
  <name>Widget A</name>
  <price>29.99</price>
  <description>A high-quality widget for various uses</description>
  <category>Widgets</category>
  <created_at>2023-01-01T00:00:00.000Z</created_at>
</product>
```

**Products List:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<products>
  <product>
    <!-- product data -->
  </product>
  <product>
    <!-- product data -->
  </product>
</products>
```

**Error Response:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<error>
  <code>404</code>
  <message>Product not found</message>
</error>
```

### API Endpoints

All endpoints use `Content-Type: application/xml` for both requests and responses.

1. `GET /api/products` - Returns all products
2. `POST /api/products` - Creates a new product
3. `GET /api/products/{id}` - Returns a specific product
4. `PUT /api/products/{id}` - Updates a specific product
5. `DELETE /api/products/{id}` - Deletes a specific product

## Advanced Features

- Rate limiting to prevent abuse
- Request logging for debugging
- XML validation to ensure data integrity
- Proper error handling with meaningful XML error responses
- CORS support for cross-origin requests