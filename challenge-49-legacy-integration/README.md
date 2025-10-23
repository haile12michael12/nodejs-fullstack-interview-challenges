## Challenge 49 – Legacy System Integration

### Overview
Integrate with legacy systems through APIs, message queues, and file-based interfaces with data transformation.

### Features
- API integration with legacy SOAP/REST services
- Message queue integration (MQTT, AMQP)
- File-based data exchange (CSV, XML)
- Data transformation and mapping
- Error handling and retry mechanisms

### Prerequisites
- Node.js 18+
- SOAP client library
- Message queue system (RabbitMQ, Apache Kafka)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `LEGACY_API_URL` (required)
- `MQTT_BROKER` (default mqtt://localhost:1883)
- `PORT` (default 3000)

### Endpoints
- `POST /integrate/api` → Integrate with legacy API
- `POST /integrate/mq` → Process message queue data
- `POST /integrate/file` → Process file-based integration
- `GET /integration-status` → Get integration status

### Testing
- Test API integration with sample legacy services
- Verify message queue processing
- Test file-based data exchange
- Validate data transformation logic

### Notes
- Implement circuit breaker for legacy system calls
- Handle different data formats and encodings
- Support asynchronous processing for long-running integrations
- Provide monitoring and alerting for integration failures