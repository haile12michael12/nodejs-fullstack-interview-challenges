// API utility functions
const API_BASE = 'http://localhost:3000'; // Adjust this to match your backend URL

export async function uploadFile(file, onProgress) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const progress = Math.round((e.loaded / e.total) * 100);
        onProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const result = JSON.parse(xhr.responseText);
          resolve(result);
        } catch (error) {
          reject(new Error('Invalid response from server'));
        }
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error.error || 'Upload failed'));
        } catch (error) {
          reject(new Error('Upload failed'));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during upload'));
    };

    xhr.open('POST', `${API_BASE}/upload`);
    xhr.send(formData);
  });
}

export async function listFiles() {
  try {
    const response = await fetch(`${API_BASE}/files`);
    if (response.ok) {
      const data = await response.json();
      return data.files || [];
    } else {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch files');
    }
  } catch (error) {
    throw new Error('Network error while fetching files: ' + error.message);
  }
}

export async function deleteFile(filename) {
  try {
    const response = await fetch(`${API_BASE}/delete?filename=${encodeURIComponent(filename)}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      return true;
    } else {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete file');
    }
  } catch (error) {
    throw new Error('Network error while deleting file: ' + error.message);
  }
}