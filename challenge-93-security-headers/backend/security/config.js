require('dotenv').config();

const defaultConfig = {
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
      }
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true
    },
    frameguard: {
      action: 'deny'
    },
    referrerPolicy: {
      policy: 'no-referrer'
    },
    dnsPrefetchControl: {
      allow: false
    },
    hidePoweredBy: true,
    ieNoOpen: true,
    noSniff: true,
    xssFilter: true
  }
};

const loadConfig = () => {
  try {
    // In a real implementation, we might load from a file or database
    return defaultConfig;
  } catch (error) {
    console.error('Failed to load security config, using defaults', error);
    return defaultConfig;
  }
};

const saveConfig = (config) => {
  // In a real implementation, we would save to a file or database
  console.log('Security config updated');
};

module.exports = {
  loadConfig,
  saveConfig,
  defaultConfig
};