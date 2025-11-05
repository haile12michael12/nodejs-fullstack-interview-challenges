const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/dataController');

// Get data endpoint
router.get('/items', getData);

module.exports = router;