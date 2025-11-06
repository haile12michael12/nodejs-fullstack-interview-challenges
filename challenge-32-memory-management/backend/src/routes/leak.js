const express = require('express');
const router = express.Router();

// Store objects that will cause memory leaks
let leakyObjects = [];

// Create memory leak
router.post('/', (req, res) => {
  try {
    const { count = 100 } = req.body;
    
    // Validate input
    if (count <= 0) {
      return res.status(400).json({ error: 'Count must be a positive number' });
    }
    
    // Create objects that will cause memory leaks
    for (let i = 0; i < count; i++) {
      // Create circular references that are hard to garbage collect
      const obj = {
        id: Math.random().toString(36).substr(2, 9),
        data: new Array(1000).fill('leaky').join(''),
        timestamp: Date.now()
      };
      
      // Create circular reference
      obj.self = obj;
      
      // Add to global array to prevent garbage collection
      leakyObjects.push(obj);
    }
    
    res.json({
      message: `Created ${count} leaky objects`,
      totalLeakyObjects: leakyObjects.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to create memory leak: ${error.message}` });
  }
});

module.exports = router;