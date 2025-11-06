const { v4: uuidv4 } = require('uuid');

// Validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

// Generate unique ID
const generateId = () => {
  return uuidv4();
};

// Sanitize HTML
const sanitizeHtml = (html) => {
  // Simple sanitization - in a real app, use a library like DOMPurify
  return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

module.exports = {
  validateEmail,
  formatDate,
  generateId,
  sanitizeHtml
};