function escapeXml(text) {
  if (typeof text !== 'string') {
    text = String(text);
  }
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createXmlElement(tag, content, attributes = {}) {
  const attrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${escapeXml(String(value))}"`)
    .join(' ');
  
  const attrString = attrs ? ` ${attrs}` : '';
  
  if (content === null || content === undefined) {
    return `<${tag}${attrString}/>`;
  }
  
  if (typeof content === 'object') {
    const children = Object.entries(content)
      .map(([childTag, childContent]) => createXmlElement(childTag, childContent))
      .join('');
    return `<${tag}${attrString}>${children}</${tag}>`;
  }
  
  return `<${tag}${attrString}>${escapeXml(String(content))}</${tag}>`;
}

function createXmlDocument(rootElement, declaration = true) {
  const xmlDeclaration = declaration ? '<?xml version="1.0" encoding="UTF-8"?>' : '';
  return `${xmlDeclaration}\n${rootElement}`;
}

function parseXmlAttributes(attributeString) {
  const attributes = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;
  
  while ((match = regex.exec(attributeString)) !== null) {
    attributes[match[1]] = match[2];
  }
  
  return attributes;
}

function parseXmlElement(xmlString, tagName) {
  const regex = new RegExp(`<${tagName}([^>]*)>(.*?)</${tagName}>`, 's');
  const match = xmlString.match(regex);
  
  if (!match) {
    return null;
  }
  
  const attributes = parseXmlAttributes(match[1]);
  const content = match[2].trim();
  
  return {
    attributes,
    content,
    fullMatch: match[0]
  };
}

function validateXmlStructure(xmlString) {
  try {
    // Basic XML validation - check for well-formed tags
    const openTags = [];
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    let match;
    
    while ((match = tagRegex.exec(xmlString)) !== null) {
      const tag = match[1];
      const isClosing = match[0].startsWith('</');
      
      if (isClosing) {
        if (openTags.length === 0 || openTags.pop() !== tag) {
          return { valid: false, error: `Mismatched closing tag: ${tag}` };
        }
      } else if (!match[0].endsWith('/>')) {
        openTags.push(tag);
      }
    }
    
    if (openTags.length > 0) {
      return { valid: false, error: `Unclosed tags: ${openTags.join(', ')}` };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

module.exports = {
  escapeXml,
  createXmlElement,
  createXmlDocument,
  parseXmlAttributes,
  parseXmlElement,
  validateXmlStructure
};
