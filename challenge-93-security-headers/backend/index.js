const express = require('express');
const cors = require('cors');
const securityMiddleware = require('./security/middleware');
const securityRoutes = require('./routes/security');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(securityMiddleware);

// Routes
app.use('/api/security', securityRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;