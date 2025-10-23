## Challenge 54 – Decentralized Storage

### Overview
Build a decentralized storage system using IPFS with content addressing, peer-to-peer networking, and data persistence.

### Features
- Content addressing with CID (Content Identifier)
- Peer-to-peer file sharing
- Data persistence and pinning strategies
- Smart contract integration for access control

### Prerequisites
- Node.js 18+
- IPFS node or IPFS cluster

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `IPFS_API_URL` (default http://localhost:5001)
- `PINNING_SERVICE` (default local)
- `PORT` (default 3000)

### Endpoints
- `POST /store` → Store file in decentralized storage
- `GET /retrieve/:cid` → Retrieve file by CID
- `POST /pin/:cid` → Pin content to ensure persistence
- `GET /peers` → List connected peers

### Testing
- Store and retrieve files using IPFS
- Test content addressing with CIDs
- Verify peer-to-peer file sharing
- Test pinning strategies for persistence

### Notes
- Implement proper CID versioning
- Handle large file chunking and streaming
- Support encryption for private files
- Implement garbage collection policies