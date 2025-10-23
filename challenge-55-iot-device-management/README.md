## Challenge 55 – IoT Device Management

### Overview
Create an IoT device management platform with device provisioning, monitoring, and remote control capabilities.

### Features
- Device provisioning and authentication
- Real-time device monitoring and telemetry
- Remote device configuration and control
- Device firmware update management

### Prerequisites
- Node.js 18+
- MQTT broker (Mosquitto or EMQX)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `MQTT_BROKER_URL` (default mqtt://localhost:1883)
- `DEVICE_REGISTRY_DB` (default ./devices.db)
- `PORT` (default 3000)

### Endpoints
- `POST /devices/register` → Register new IoT device
- `GET /devices/:id` → Get device information
- `POST /devices/:id/command` → Send command to device
- `GET /devices/:id/telemetry` → Get device telemetry data

### Testing
- Register and provision IoT devices
- Test real-time telemetry monitoring
- Verify remote device control
- Test firmware update mechanisms

### Notes
- Implement secure device authentication
- Handle device lifecycle management
- Support device groups and hierarchies
- Provide alerting for device anomalies