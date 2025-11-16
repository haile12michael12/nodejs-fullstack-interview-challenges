# Legacy XML API - Frontend

A React frontend client for the legacy XML-only API that handles product management operations using XML for all communications.

## Features

- XML-only communication with backend API
- DOMParser-based XML parsing
- React components for product management
- XML to JSON conversion utilities
- JSON to XML conversion utilities

## Project Structure

```
frontend/
├── package.json
├── vite.config.js
│
├── src/
│   ├── App.jsx
│   │
│   ├── api/
│   │   └── xmlClient.js
│   │
│   ├── hooks/
│   │   └── useXML.js
│   │
│   ├── components/
│   │   ├── ProductList.jsx
│   │   ├── ProductForm.jsx
│   │   └── XMLViewer.jsx
│   │
│   └── utils/
│       ├── xmlToJson.js
│       └── jsonToXml.js
│
└── README.md
```

## Components

### ProductList.jsx
Displays a list of products with delete functionality.

### ProductForm.jsx
Form component for creating new products with XML payload generation.

### XMLViewer.jsx
Component for displaying raw XML responses from the API.

## Hooks

### useXML.js
Custom hook for XML parsing and serialization with DOMParser.

## Utilities

### xmlToJson.js
Utility functions for converting XML strings to JavaScript objects.

### jsonToXml.js
Utility functions for converting JavaScript objects to XML strings.

## API Client

### xmlClient.js
Fetch wrapper specifically designed for XML-only API communication.

## Running the Frontend

```bash
npm run dev
```

The frontend will start on port 5173 by default and proxy API requests to the backend server.