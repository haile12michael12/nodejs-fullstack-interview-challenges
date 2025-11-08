const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const specs = require('./config/swagger');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origin
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Swagger JSON and YAML
app.get(`${config.docs.path}/json`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

app.get(`${config.docs.path}/yaml`, (req, res) => {
  res.setHeader('Content-Type', 'text/yaml');
  res.send(JSON.stringify(specs, null, 2));
});

// Serve Swagger UI
app.use(config.docs.path, swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;