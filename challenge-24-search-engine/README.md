## Challenge 24 – Custom Search Engine

### Overview
Build a custom search engine with indexing, querying, and ranking capabilities for text-based content.

### Features
- Text indexing and tokenization
- Inverted index implementation
- Query parsing and execution
- Relevance ranking algorithms
- Faceted search support

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `INDEX_PATH` (default ./search-index)
- `PORT` (default 3000)

### Endpoints
- `POST /index` → Add documents to index
- `GET /search?q=:query` → Search documents
- `GET /facets` → Get facet information
- `DELETE /index` → Clear index

### Testing
- Index sample documents and perform searches
- Test different query types (phrase, boolean, fuzzy)
- Evaluate ranking quality

### Notes
- Implement TF-IDF for relevance scoring
- Support stemming and stop words
- Handle index persistence to disk