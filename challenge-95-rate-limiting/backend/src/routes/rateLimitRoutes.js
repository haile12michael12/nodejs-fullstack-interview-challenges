const express = require('express');
const router = express.Router();

// Get rate limit configuration
router.get('/config', (req, res) => {
  res.json({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
  });
});

// Get rate limit status
router.get('/status', (req, res) => {
  // In a real implementation, we would get this from Redis or memory store
  res.json({
    status: 'active',
    currentUsage: 0,
    limit: 100,
    windowMs: 15 * 60 * 1000
  });
});

// Reset rate limit for an IP (admin only)
router.post('/reset/:ip', (req, res) => {
  const { ip } = req.params;
  // In a real implementation, we would reset the rate limit for this IP
  res.json({ message: `Rate limit reset for IP: ${ip}` });
});

module.exports = router;