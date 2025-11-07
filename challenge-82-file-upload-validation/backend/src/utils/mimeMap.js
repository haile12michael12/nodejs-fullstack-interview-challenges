// Common MIME types and their corresponding file extensions
const mimeMap = {
  // Image types
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  'image/svg+xml': ['.svg'],
  
  // Document types
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'text/plain': ['.txt'],
  'text/csv': ['.csv'],
  
  // Audio types
  'audio/mpeg': ['.mp3'],
  'audio/wav': ['.wav'],
  'audio/ogg': ['.ogg'],
  
  // Video types
  'video/mp4': ['.mp4'],
  'video/mpeg': ['.mpeg'],
  'video/quicktime': ['.mov'],
};

// Reverse mapping from extensions to MIME types
const extensionMap = {};
Object.keys(mimeMap).forEach(mimeType => {
  mimeMap[mimeType].forEach(ext => {
    extensionMap[ext] = mimeType;
  });
});

module.exports = {
  mimeMap,
  extensionMap,
};