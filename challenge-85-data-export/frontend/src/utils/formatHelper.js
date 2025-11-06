export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

export const getExportFormatLabel = (format) => {
  const labels = {
    csv: 'CSV',
    json: 'JSON',
    excel: 'Excel',
  };
  
  return labels[format] || format.toUpperCase();
};

export const getExportFormatIcon = (format) => {
  const icons = {
    csv: '📄',
    json: '📝',
    excel: '📊',
  };
  
  return icons[format] || '📦';
};