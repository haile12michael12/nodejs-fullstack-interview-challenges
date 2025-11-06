const express = require('express');
const cors = require('cors');
const rateLimiter = require('./src/middlewares/rateLimiter');
const routes = require('./src/routes');
const config = require('./src/config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Apply global rate limiter
app.use(rateLimiter);

// Routes
app.use('/', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;