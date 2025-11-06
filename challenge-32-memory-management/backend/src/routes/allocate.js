const express = require('express');
const router = express.Router();

// Store allocated objects to prevent garbage collection
let allocatedObjects = [];

// Allocate memory
router.post('/', (req, res) => {
  try {
    const { size = 1000, count = 1 } = req.body;
    
    // Validate input
    if (size <= 0 || count <= 0) {
      return res.status(400).json({ error: 'Size and count must be positive numbers' });
    }
    
    // Allocate memory
    for (let i = 0; i < count; i++) {
      const obj = {
        id: Math.random().toString(36).substr(2, 9),
        data: new Array(size).fill('x').join(''),
        timestamp: Date.now()
      };
      allocatedObjects.push(obj);
    }
    
    res.json({
      message: `Allocated ${count} objects of size ${size} bytes each`,
      totalObjects: allocatedObjects.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to allocate memory: ${error.message}` });
  }
});

module.exports = router;