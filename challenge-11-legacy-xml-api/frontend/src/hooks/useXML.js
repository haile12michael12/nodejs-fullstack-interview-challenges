import { useState, useCallback } from 'react';

// DOMParser-based XML parsing hook
export function useXML() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const parseXML = useCallback((xmlString, elementName) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      
      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('XML parsing error: ' + parserError.textContent);
      }
      
      if (elementName) {
        // Parse specific element
        const elements = xmlDoc.getElementsByTagName(elementName);
        const result = [];
        
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const item = {};
          
          // Get all child elements
          for (let j = 0; j < element.children.length; j++) {
            const child = element.children[j];
            item[child.tagName] = child.textContent;
          }
          
          result.push(item);
        }
        
        return result;
      }
      
      return xmlDoc;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const xmlToString = useCallback((obj, rootElement = 'root') => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<${rootElement}>\n`;
    
    for (const [key, value] of Object.entries(obj)) {
      xml += `  <${key}>${value}</${key}>\n`;
    }
    
    xml += `</${rootElement}>`;
    return xml;
  }, []);

  return {
    loading,
    error,
    parseXML,
    xmlToString,
    setLoading,
    setError
  };
}