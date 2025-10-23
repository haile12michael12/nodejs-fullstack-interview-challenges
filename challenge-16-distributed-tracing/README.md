## Challenge 16 – Distributed Tracing with OpenTelemetry

### Overview
Implement distributed tracing across multiple microservices using OpenTelemetry. Services will propagate trace context and export traces to a collector.

### Features
- OpenTelemetry instrumentation
- Trace context propagation
- Span creation and correlation
- Export traces to Jaeger or Zipkin
- Custom span attributes and events

### Prerequisites
- Node.js 18+
- Docker (for trace collector)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Start trace collector (Jaeger): `docker run -d -p 16686:16686 -p 4317:4317 jaegertracing/all-in-one:latest`
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `OTEL_EXPORTER_OTLP_ENDPOINT` (default http://localhost:4317)
- `SERVICE_NAME` (default user-service)

### Endpoints
- `GET /users` → triggers call to profile-service
- `GET /profiles` → standalone endpoint

### Testing
- View traces at http://localhost:16686

### Notes
- Use `@opentelemetry/sdk-node` for instrumentation
- Propagate trace context via HTTP headers
- Add custom attributes for business context