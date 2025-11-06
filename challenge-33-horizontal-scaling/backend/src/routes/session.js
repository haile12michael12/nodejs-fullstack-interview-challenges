const express = require('express');
const router = express.Router();

// Create a new session
router.post('/', (req, res) => {
  req.session.data = {
    userId: Math.floor(Math.random() * 1000),
    createdAt: new Date().toISOString()
  };
  
  res.json({ 
    message: 'Session created',
    sessionId: req.sessionID,
    data: req.session.data
  });
});

// Get session data
router.get('/', (req, res) => {
  if (req.session.data) {
    res.json({ 
      sessionId: req.sessionID,
      data: req.session.data,
      workerId: process.pid
    });
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

// Update session data
router.put('/', (req, res) => {
  if (req.session.data) {
    req.session.data = { ...req.session.data, ...req.body };
    res.json({ 
      message: 'Session updated',
      sessionId: req.sessionID,
      data: req.session.data
    });
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

// Destroy session
router.delete('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to destroy session' });
    } else {
      res.json({ message: 'Session destroyed' });
    }
  });
});

module.exports = router;