const express = require('express');
const router = express.Router();
const { loadConfig, saveConfig } = require('../security/config');

// Get current security configuration
router.get('/config', (req, res) => {
  try {
    const config = loadConfig();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

// Update security configuration
router.post('/config', (req, res) => {
  try {
    const newConfig = req.body;
    saveConfig(newConfig);
    res.json({ message: 'Configuration updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update configuration' });
  }
});

// Get security headers status
router.get('/status', (req, res) => {
  res.json({
    status: 'active',
    headers: {
      'content-security-policy': 'configured',
      'strict-transport-security': 'configured',
      'x-frame-options': 'configured',
      'x-content-type-options': 'configured',
      'referrer-policy': 'configured',
      'x-dns-prefetch-control': 'configured'
    }
  });
});

module.exports = router;