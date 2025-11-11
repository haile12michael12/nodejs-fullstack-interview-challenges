// Helper for JWT encoding
function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64UrlDecode(str) {
  str += new Array(5 - str.length % 4).join('=');
  str = str.replace(/\-/g, '+').replace(/_/g, '/');
  return Buffer.from(str, 'base64');
}

module.exports = {
  base64UrlEncode,
  base64UrlDecode
};