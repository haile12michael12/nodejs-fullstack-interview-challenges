# Legacy XML API - Backend

A legacy XML-only API server that handles product management operations using pure XML for requests and responses.

## Features

- XML-only endpoints (no JSON support)
- Full CRUD operations for products
- XML validation and parsing
- Rate limiting
- Request logging
- CORS support for frontend integration

## Project Structure

```
backend/
├── package.json
├── server.js
│
├── controllers/
│   └── productController.js
│
├── routes/
│   └── productRoutes.js
│
├── xml/
│   ├── xmlBuilder.js
│   ├── xmlParser.js
│   └── xmlValidator.js
│
├── middleware/
│   └── xmlOnly.js
│
├── utils/
│   ├── logger.js
│   ├── httpHelpers.js
│   └── rateLimiter.js
│
├── data/
│   └── products.json
│
└── README.md
```

## API Endpoints

All endpoints use `Content-Type: application/xml` for both requests and responses.

### Get All Products
```
GET /api/products
```

### Get Product by ID
```
GET /api/products/{id}
```

### Create Product
```
POST /api/products
```

Request body:
```xml
<product>
  <name>Product Name</name>
  <price>29.99</price>
  <description>Product description</description>
  <category>Category</category>
</product>
```

### Update Product
```
PUT /api/products/{id}
```

Request body:
```xml
<product>
  <name>Updated Product Name</name>
  <price>39.99</price>
  <description>Updated description</description>
  <category>Updated Category</category>
</product>
```

### Delete Product
```
DELETE /api/products/{id}
```

## Running the Server

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will start on port 3000 by default.

## Testing

Run the test suite:
```bash
npm test
```