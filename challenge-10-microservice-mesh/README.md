## Challenge 10 – Microservice Mesh

### Overview
A full microservice mesh implementation with:
- API Gateway for routing requests
- User Service for user management
- Email Service for sending notifications
- RabbitMQ as the message broker
- React frontend dashboard
- Monitoring with Prometheus and Grafana

### Architecture
```
Client -> Gateway -> User Service <-> RabbitMQ <- Email Service
              \-> Frontend Dashboard
              \-> Monitoring (Prometheus/Grafana)
```

### Prerequisites
- Node.js 18+
- Docker and Docker Compose

### Setup
1. Install dependencies for each service:
   - `cd gateway && npm install`
   - `cd user-service && npm install`
   - `cd email-service && npm install`
   - `cd frontend && npm install`

### Run
#### Option 1: Docker Compose (Recommended)
```bash
# Start all services
docker-compose up

# Services will be available at:
# - Gateway: http://localhost:3000
# - User Service: http://localhost:3001
# - Email Service: http://localhost:3002
# - Frontend: http://localhost:3003
# - Grafana: http://localhost:3004
# - RabbitMQ Management: http://localhost:15672
# - Prometheus: http://localhost:9090
```

#### Option 2: Manual
1. Start RabbitMQ: `docker run -p 5672:5672 -p 15672:15672 rabbitmq:3-management-alpine`
2. Start services in separate terminals:
   - Gateway: `cd gateway && npm start`
   - User Service: `cd user-service && npm start`
   - Email Service: `cd email-service && npm start`
   - Frontend: `cd frontend && npm start`

### Features
- **User Management**: Create, read, update, delete users
- **Event-Driven Architecture**: User events published to RabbitMQ
- **Email Notifications**: Welcome emails sent on user creation
- **API Gateway**: Centralized routing and request handling
- **Monitoring**: Service metrics with Prometheus and Grafana
- **Logging**: Structured logging with Winston
- **Error Handling**: Comprehensive error handling and retries

### Testing
1. Create a user: `curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}'`
2. Check logs in user-service/logs and email-service/logs
3. View RabbitMQ management console at http://localhost:15672
4. View monitoring dashboards at http://localhost:3004 (Grafana)

### Notes
- All services use durable queues/topics for message persistence
- Automatic reconnection handling for broker connections
- Health checks available at `/health` endpoint for each service
- Environment variables configurable via .env files
