const express = require('express');
const router = express.Router();
const { 
  encryptData, 
  decryptData, 
  listKeys, 
  rotateKey 
} = require('../controllers/encryptionController');

// Encrypt data
router.post('/encrypt', encryptData);

// Decrypt data
router.post('/decrypt', decryptData);

// List encryption keys
router.get('/keys', listKeys);

// Rotate encryption key
router.post('/rotate-key', rotateKey);

module.exports = router;