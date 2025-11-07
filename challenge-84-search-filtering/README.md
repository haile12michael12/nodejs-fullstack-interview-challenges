# Search and Filtering Implementation

## Overview
This project implements a full-stack search and filtering solution with both backend and frontend components. The backend provides RESTful APIs for searching and filtering data, while the frontend offers a user-friendly interface for interacting with these features.

## Features
- Full-text search across multiple fields
- Field-based filtering (category, price range, etc.)
- Sorting and ordering capabilities
- Pagination for large result sets
- Advanced search with multiple criteria
- Responsive UI with React and Tailwind CSS

## Project Structure
```
search-filtering/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── modules/
│   │   │   └── search/
│   │   │       ├── search.controller.js
│   │   │       ├── search.service.js
│   │   │       ├── search.repository.js
│   │   │       ├── search.routes.js
│   │   │       └── search.validator.js
│   │   ├── core/
│   │   │   ├── http/
│   │   │   │   ├── response.js
│   │   │   │   └── error-handler.js
│   │   │   ├── utils/
│   │   │   │   ├── logger.js
│   │   │   │   └── sanitizer.js
│   │   │   └── middleware/
│   │   │       ├── validateRequest.js
│   │   │       └── errorMiddleware.js
│   │   └── routes/
│   │       └── index.js
│   ├── tests/
│   │   └── search.test.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.jsx
│   │   │   ├── search.jsx
│   │   ├── components/
│   │   │   ├── SearchBar/
│   │   │   │   └── SearchBar.jsx
│   │   │   ├── FilterPanel/
│   │   │   │   └── FilterPanel.jsx
│   │   │   ├── SortMenu/
│   │   │   │   └── SortMenu.jsx
│   │   │   ├── ResultList/
│   │   │   │   └── ResultList.jsx
│   │   │   └── Pagination.jsx
│   │   ├── hooks/
│   │   │   └── useSearch.js
│   │   ├── utils/
│   │   │   └── apiClient.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.local
│
├── docker-compose.yml
└── README.md
```

## Setup and Installation

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The backend will run on port 3000.

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on port 3001.

## API Endpoints

### Search
- `GET /search?q=query` - Search across all fields
- `GET /search?filter[field]=value` - Filter by field
- `GET /search?sort=field&order=asc` - Sort results
- `POST /search/advanced` - Advanced search with multiple criteria

### Health Check
- `GET /health` - Check if the server is running

## Environment Variables

### Backend
- `PORT` (default: 3000) - Server port
- `SEARCH_MIN_LENGTH` (default: 3) - Minimum search query length
- `SEARCH_MAX_RESULTS` (default: 100) - Maximum results per page

### Frontend
- `VITE_API_BASE_URL` (default: http://localhost:3000) - Backend API base URL

## Running with Docker
To run both services using Docker Compose:

```bash
docker-compose up
```

This will start both the backend (port 3000) and frontend (port 3001).

## Testing
To run backend tests:

```bash
cd backend
npm test
```

## Technologies Used
- **Backend**: Node.js, Express, Joi, Winston
- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Testing**: Jest, Supertest
- **Deployment**: Docker, Docker Compose