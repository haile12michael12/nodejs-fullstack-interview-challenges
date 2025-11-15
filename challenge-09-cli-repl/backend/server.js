const express = require('express');
const cors = require('cors');
const path = require('path');
const { loadData, saveData, data } = require('./repl');

// Load data on startup
loadData();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// API Routes
app.get('/api/items', (req, res) => {
  const pattern = req.query.pattern || '';
  const regex = new RegExp(pattern, 'i');
  
  const matchingKeys = Object.keys(data).filter(key => regex.test(key));
  const result = {};
  
  matchingKeys.forEach(key => {
    result[key] = data[key];
  });
  
  res.json(result);
});

app.get('/api/items/:key', (req, res) => {
  const key = req.params.key;
  if (data[key]) {
    res.json({ key, ...data[key] });
  } else {
    res.status(404).json({ error: `Key '${key}' not found` });
  }
});

app.post('/api/items', (req, res) => {
  const { key, value } = req.body;
  
  if (!key || !value) {
    return res.status(400).json({ error: 'Key and value are required' });
  }
  
  data[key] = {
    value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  saveData();
  res.status(201).json({ key, ...data[key] });
});

app.put('/api/items/:key', (req, res) => {
  const key = req.params.key;
  const { value } = req.body;
  
  if (!data[key]) {
    return res.status(404).json({ error: `Key '${key}' not found` });
  }
  
  if (!value) {
    return res.status(400).json({ error: 'Value is required' });
  }
  
  data[key] = {
    ...data[key],
    value,
    updatedAt: new Date().toISOString()
  };
  
  saveData();
  res.json({ key, ...data[key] });
});

app.delete('/api/items/:key', (req, res) => {
  const key = req.params.key;
  
  if (!data[key]) {
    return res.status(404).json({ error: `Key '${key}' not found` });
  }
  
  delete data[key];
  saveData();
  res.status(204).send();
});

app.delete('/api/items', (req, res) => {
  const count = Object.keys(data).length;
  Object.keys(data).forEach(key => {
    delete data[key];
  });
  saveData();
  res.json({ message: `Cleared ${count} item(s)` });
});

app.get('/api/stats', (req, res) => {
  const keys = Object.keys(data);
  const stats = {
    totalItems: keys.length
  };
  
  if (keys.length > 0) {
    stats.totalSize = JSON.stringify(data).length;
    stats.oldest = Math.min(...keys.map(key => new Date(data[key].createdAt).getTime()));
    stats.newest = Math.max(...keys.map(key => new Date(data[key].createdAt).getTime()));
  }
  
  res.json(stats);
});

// Serve frontend app for any remaining routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});