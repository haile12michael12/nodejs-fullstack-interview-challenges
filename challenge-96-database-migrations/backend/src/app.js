const express = require('express');
const cors = require('cors');
const migrationRoutes = require('./routes/migrationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/migrations', migrationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = app;