## Challenge 18 – Kafka Streams Processing

### Overview
Process real-time data streams using Apache Kafka. Implement stream processors that transform, filter, and aggregate data in real-time.

### Features
- Kafka producer and consumer implementation
- Stream processing with transformations
- Windowed aggregations
- Fault-tolerant processing
- Exactly-once semantics

### Prerequisites
- Node.js 18+
- Apache Kafka (Docker recommended)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Start Kafka: `docker-compose up -d` (using provided docker-compose)
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `KAFKA_BROKER` (default localhost:9092)
- `PORT` (default 3000)

### Endpoints
- `POST /events` → Produce events to Kafka
- `GET /processed` → Get processed results
- `GET /metrics` → Get processing metrics

### Testing
- Send events through the API and observe processed results
- Monitor throughput and latency metrics

### Notes
- Use kafka-node or kafkajs library
- Implement fault tolerance with consumer groups
- Handle backpressure in stream processing