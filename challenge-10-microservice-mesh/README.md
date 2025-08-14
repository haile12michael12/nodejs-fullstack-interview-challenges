## Challenge 10 – Microservice Mesh

### Overview
Two services (`user-service`, `email-service`) communicate via a message broker (RabbitMQ or Redis Pub/Sub). No API gateway required.

### Prerequisites
- Node.js 18+
- Docker (for broker)

### Setup
- `cd user-service && npm install`
- `cd ../email-service && npm install`

### Run
- Start broker (e.g., Docker Compose)
- Start each service: `npm start`

### Notes
- Use durable queues/topics and handle reconnection.
