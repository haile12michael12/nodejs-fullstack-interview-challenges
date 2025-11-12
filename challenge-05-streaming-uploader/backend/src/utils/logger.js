// Logger utility
function logInfo(message, metadata = {}) {
  console.log(JSON.stringify({
    level: 'info',
    timestamp: new Date().toISOString(),
    message,
    ...metadata
  }));
}

function logError(message, metadata = {}) {
  console.error(JSON.stringify({
    level: 'error',
    timestamp: new Date().toISOString(),
    message,
    ...metadata
  }));
}

function logWarn(message, metadata = {}) {
  console.warn(JSON.stringify({
    level: 'warn',
    timestamp: new Date().toISOString(),
    message,
    ...metadata
  }));
}

module.exports = {
  logInfo,
  logError,
  logWarn
};