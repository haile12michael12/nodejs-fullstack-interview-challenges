// Converts JS object → XML string
export function jsonToXml(obj, rootElement = 'root') {
  function serialize(obj, indent = 0) {
    let xml = '';
    const spaces = '  '.repeat(indent);
    
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        // Handle arrays
        for (const item of obj) {
          xml += serialize(item, indent);
        }
      } else {
        // Handle objects
        for (const [key, value] of Object.entries(obj)) {
          if (key.startsWith('@')) {
            // Skip attributes for this simple implementation
            continue;
          }
          
          if (key === '#text') {
            // Text content
            xml += value;
          } else if (typeof value === 'object') {
            // Nested object
            xml += `${spaces}<${key}>\n`;
            xml += serialize(value, indent + 1);
            xml += `${spaces}</${key}>\n`;
          } else {
            // Simple value
            xml += `${spaces}<${key}>${value}</${key}>\n`;
          }
        }
      }
    } else {
      // Primitive value
      xml += String(obj);
    }
    
    return xml;
  }
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += `<${rootElement}>\n`;
  xml += serialize(obj, 1);
  xml += `</${rootElement}>`;
  
  return xml;
}

// Create product XML
export function createProductXml(product) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<product>\n';
  
  if (product.name) xml += `  <name>${product.name}</name>\n`;
  if (product.price) xml += `  <price>${product.price}</price>\n`;
  if (product.description) xml += `  <description>${product.description}</description>\n`;
  if (product.category) xml += `  <category>${product.category}</category>\n`;
  
  xml += '</product>';
  return xml;
}