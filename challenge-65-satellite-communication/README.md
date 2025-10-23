## Challenge 65 – Satellite Communication

### Overview
Build satellite communication protocols with orbital mechanics, signal processing, and ground station integration.

### Features
- Orbital mechanics and satellite tracking
- Digital signal processing for communication
- Ground station network management
- Error correction and link budget analysis

### Prerequisites
- Node.js 18+
- Signal processing libraries

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `TLE_SOURCE` (default celestrak)
- `GROUND_STATIONS` (default ./stations.json)
- `PORT` (default 3000)

### Endpoints
- `GET /satellites` → List tracked satellites
- `POST /schedule` → Schedule communication window
- `POST /transmit` → Transmit data to satellite
- `GET /ground-stations` → List ground stations

### Testing
- Test satellite tracking and prediction
- Verify digital signal processing
- Test communication scheduling
- Validate error correction codes

### Notes
- Implement Two-Line Element (TLE) parsing
- Support multiple modulation schemes
- Handle Doppler shift compensation
- Provide link quality monitoring