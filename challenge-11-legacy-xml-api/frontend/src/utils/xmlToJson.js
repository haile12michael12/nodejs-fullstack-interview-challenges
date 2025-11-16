// Converts XML → JS object
export function xmlToJson(xmlString) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('XML parsing error: ' + parserError.textContent);
    }
    
    function parseNode(node) {
      const obj = {};
      
      // Process attributes
      if (node.attributes) {
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj[`@${attr.name}`] = attr.value;
        }
      }
      
      // Process child nodes
      if (node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent.trim();
            if (text) {
              obj['#text'] = text;
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const childObj = parseNode(child);
            
            if (obj[child.nodeName]) {
              // If property already exists, convert to array
              if (!Array.isArray(obj[child.nodeName])) {
                obj[child.nodeName] = [obj[child.nodeName]];
              }
              obj[child.nodeName].push(childObj);
            } else {
              // Single property
              obj[child.nodeName] = childObj;
            }
          }
        }
      }
      
      return obj;
    }
    
    // Start parsing from root element
    const root = xmlDoc.documentElement;
    return {
      [root.nodeName]: parseNode(root)
    };
  } catch (error) {
    console.error('XML to JSON conversion error:', error);
    return null;
  }
}