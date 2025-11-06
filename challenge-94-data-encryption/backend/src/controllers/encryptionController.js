const encryptionService = require('../services/encryptionService');

const encryptData = async (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }
    
    const encrypted = encryptionService.encryptData(data);
    res.json(encrypted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const decryptData = async (req, res) => {
  try {
    const { encryptedData, iv } = req.body;
    
    if (!encryptedData || !iv) {
      return res.status(400).json({ error: 'Encrypted data and IV are required' });
    }
    
    const decrypted = encryptionService.decryptData(encryptedData, iv);
    res.json({ decryptedData: decrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listKeys = async (req, res) => {
  try {
    const keys = encryptionService.listKeys();
    res.json(keys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const rotateKey = async (req, res) => {
  try {
    const result = encryptionService.rotateKey();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  encryptData,
  decryptData,
  listKeys,
  rotateKey
};