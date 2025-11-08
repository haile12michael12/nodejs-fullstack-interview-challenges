// Secrets manager for secure handling of sensitive configuration
const fs = require('fs');
const path = require('path');

class SecretsManager {
  constructor() {
    this.secrets = {};
    this.loadSecrets();
  }

  // Load secrets from files or environment variables
  loadSecrets() {
    // Load from environment variables first
    this.secrets = {
      jwtSecret: process.env.JWT_SECRET,
      dbPassword: process.env.DB_PASSWORD,
      apiKey: process.env.API_KEY
    };

    // Override with file-based secrets if they exist
    const secretsDir = path.join(__dirname, '..', '..', 'secrets');
    
    if (fs.existsSync(secretsDir)) {
      const files = fs.readdirSync(secretsDir);
      
      files.forEach(file => {
        if (file.endsWith('.secret')) {
          const key = file.replace('.secret', '');
          const secretPath = path.join(secretsDir, file);
          
          try {
            const secretValue = fs.readFileSync(secretPath, 'utf8').trim();
            this.secrets[key] = secretValue;
          } catch (error) {
            console.warn(`Warning: Could not read secret file ${file}`);
          }
        }
      });
    }
  }

  // Get a secret by key
  get(key) {
    return this.secrets[key];
  }

  // Set a secret (for testing purposes)
  set(key, value) {
    this.secrets[key] = value;
  }

  // Check if a secret exists
  has(key) {
    return this.secrets.hasOwnProperty(key);
  }

  // Get all secrets (be careful with this in production)
  getAll() {
    return { ...this.secrets };
  }

  // Mask secrets for logging
  maskSecrets(obj) {
    const maskedObj = { ...obj };
    
    // Mask common secret fields
    const secretFields = ['password', 'secret', 'key', 'token'];
    
    Object.keys(maskedObj).forEach(key => {
      const lowerKey = key.toLowerCase();
      if (secretFields.some(field => lowerKey.includes(field))) {
        maskedObj[key] = '***MASKED***';
      }
    });
    
    return maskedObj;
  }
}

module.exports = new SecretsManager();