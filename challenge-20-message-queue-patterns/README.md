## Challenge 20 – Advanced Message Queue Patterns

### Overview
Implement advanced message queue patterns with RabbitMQ including publish-subscribe, routing, and topic exchanges with dead letter queues.

### Features
- Publish-subscribe pattern
- Routing and topic exchanges
- Dead letter queue implementation
- Message acknowledgment and durability
- Competing consumers pattern

### Prerequisites
- Node.js 18+
- RabbitMQ (Docker recommended)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Start RabbitMQ: `docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management`
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `RABBITMQ_URL` (default amqp://localhost)
- `PORT` (default 3000)

### Endpoints
- `POST /messages` → Publish a message
- `GET /queues` → List queue statuses
- `POST /dlq/retry` → Retry messages from DLQ

### Testing
- Publish messages and observe routing behavior
- Test message durability with broker restarts
- Trigger dead letter scenarios

### Notes
- Use amqplib for RabbitMQ integration
- Implement proper error handling and retries
- Handle connection recovery gracefully