// Security scanner for uploaded files
const crypto = require('crypto');

class SecurityScanner {
  static scanFile(buffer, filename) {
    // Calculate file hash
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    
    // Basic security scan - in real implementation, you'd use proper antivirus
    const suspiciousPatterns = [
      /eval\s*\(/i,
      /<script/i,
      /javascript:/i,
      /vbscript:/i,
      /onload=/i,
      /onerror=/i
    ];

    const content = buffer.toString('utf8', 0, Math.min(buffer.length, 10240)); // Check first 10KB
    
    const threats = [];
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(content)) {
        threats.push(`Suspicious pattern detected: ${pattern.toString()}`);
      }
    }

    // Check file size for suspicious patterns
    if (buffer.length === 0) {
      threats.push('Empty file');
    }

    return {
      safe: threats.length === 0,
      threats,
      risk: threats.length > 0 ? 'HIGH' : 'LOW',
      hash
    };
  }

  static isAllowedFile(filename, contentType, config) {
    const ext = this.getFileExtension(filename);
    return config.allowedExtensions.includes(ext) && config.allowedMimeTypes.includes(contentType);
  }

  static getFileExtension(filename) {
    return '.' + filename.split('.').pop().toLowerCase();
  }
}

module.exports = SecurityScanner;