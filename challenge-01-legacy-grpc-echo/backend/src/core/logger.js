// Centralized logging utility
function info(message, metadata = {}) {
  console.log(JSON.stringify({
    level: 'info',
    timestamp: new Date().toISOString(),
    message,
    ...metadata
  }));
}

function error(message, metadata = {}) {
  console.error(JSON.stringify({
    level: 'error',
    timestamp: new Date().toISOString(),
    message,
    ...metadata
  }));
}

function warn(message, metadata = {}) {
  console.warn(JSON.stringify({
    level: 'warn',
    timestamp: new Date().toISOString(),
    message,
    ...metadata
  }));
}

module.exports = {
  info,
  error,
  warn
};