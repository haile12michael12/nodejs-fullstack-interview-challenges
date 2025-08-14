## Challenge 15 – Git Over HTTP Implementation

### Overview
Implement basic Git smart HTTP endpoints to support `git clone`, `git fetch`, and `git push` without using Git libraries.

### Prerequisites
- Node.js 18+

### Run
- Backend: `cd backend && npm install && npm start`

### Client Usage
```bash
git clone http://localhost:8080/your-repo.git
```

### Notes
- Handle packfile negotiation and refs discovery minimally.
