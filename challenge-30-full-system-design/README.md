## Challenge 30 – Full System Design

### Overview
Combine all concepts from previous challenges into a complete system design project. Build a scalable e-commerce platform with microservices architecture.

### Features
- Microservices architecture
- Event-driven communication
- Distributed tracing
- API gateway with rate limiting
- Service mesh for service-to-service communication
- Data replication and caching
- Search functionality
- Edge computing for content delivery
- Reactive UI with real-time updates

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Multiple databases (MongoDB, Redis)

### Setup
- Run `docker-compose up` in the root directory
- Each service will start in its own container

### Services Included
- `user-service` → User management
- `product-service` → Product catalog
- `order-service` → Order processing
- `payment-service` → Payment handling
- `notification-service` → Email/SMS notifications
- `search-service` → Product search
- `api-gateway` → Entry point for all requests
- `edge-cdn` → Content delivery network

### Testing
- Place orders through the frontend
- Monitor distributed traces
- Test system under load
- Verify data consistency across services

### Notes
- This is a capstone challenge combining all previous concepts
- Focus on system integration and end-to-end functionality
- Implement proper error handling across service boundaries