## Challenge 25 – Blockchain Basics

### Overview
Create a simple blockchain implementation with consensus mechanism, cryptographic hashing, and peer-to-peer networking.

### Features
- Cryptographic hashing with SHA-256
- Block structure and validation
- Proof-of-work consensus
- Peer-to-peer network communication
- Transaction handling

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `P2P_PORT` (default 6001)
- `HTTP_PORT` (default 3001)
- `DIFFICULTY` (default 2)

### Endpoints
- `GET /blocks` → Get all blocks
- `POST /mine` → Mine a new block
- `POST /transactions` → Add a new transaction
- `GET /peers` → List connected peers

### Testing
- Mine blocks and verify the chain
- Add transactions and check balances
- Connect multiple nodes and synchronize

### Notes
- Implement proper block validation
- Handle chain reorganization for longer chains
- Secure transaction signing (simplified)