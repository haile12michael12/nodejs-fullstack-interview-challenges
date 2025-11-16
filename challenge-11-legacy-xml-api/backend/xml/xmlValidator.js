const { validateXmlStructure } = require('../src/utils/xml');

function validateProductXml(xmlString) {
  // Basic validation
  if (!xmlString || xmlString.trim().length === 0) {
    return { valid: false, error: 'XML body is required' };
  }

  // Validate XML structure
  const structureValidation = validateXmlStructure(xmlString);
  if (!structureValidation.valid) {
    return { valid: false, error: structureValidation.error };
  }

  // Check for required elements
  const requiredElements = ['name', 'price'];
  for (const element of requiredElements) {
    const regex = new RegExp(`<${element}[^>]*>(.*?)</${element}>`, 's');
    const match = xmlString.match(regex);
    if (!match || !match[1] || match[1].trim() === '') {
      return { valid: false, error: `Missing or empty required element: ${element}` };
    }
  }

  // Validate price is a number
  const priceMatch = xmlString.match(/<price[^>]*>(.*?)<\/price>/s);
  if (priceMatch) {
    const price = parseFloat(priceMatch[1]);
    if (isNaN(price)) {
      return { valid: false, error: 'Price must be a valid number' };
    }
  }

  return { valid: true };
}

module.exports = {
  validateProductXml
};