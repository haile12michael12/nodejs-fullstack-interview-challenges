import React, { useState, useEffect, useRef } from 'react'

const API_BASE = '/api'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState(null)
  const [error, setError] = useState('')
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE}/files`)
      if (response.ok) {
        const data = await response.json()
        setFiles(data.files || [])
      } else {
        setError('Failed to fetch files')
      }
    } catch (error) {
      setError('Network error while fetching files')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (file) => {
    if (!file) return

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setError('File size must be less than 10MB')
      return
    }

    setSelectedFile(file)
    setError('')
    setUploadResult(null)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    handleFileSelect(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const uploadFile = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)
    setError('')

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const xhr = new XMLHttpRequest()
      
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          setUploadProgress(progress)
        }
      }

      xhr.onload = () => {
        setIsUploading(false)
        setUploadProgress(0)

        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText)
          setUploadResult(result)
          setSelectedFile(null)
          fetchFiles() // Refresh file list
        } else {
          const error = JSON.parse(xhr.responseText)
          setError(error.error || 'Upload failed')
        }
      }

      xhr.onerror = () => {
        setIsUploading(false)
        setUploadProgress(0)
        setError('Network error during upload')
      }

      xhr.open('POST', `${API_BASE}/upload`)
      xhr.send(formData)

    } catch (error) {
      setIsUploading(false)
      setUploadProgress(0)
      setError('Upload failed')
    }
  }

  const deleteFile = async (filename) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const response = await fetch(`${API_BASE}/delete?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchFiles() // Refresh file list
      } else {
        const error = await response.json()
        setError(error.error || 'Failed to delete file')
      }
    } catch (error) {
      setError('Network error while deleting file')
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const openUploadArea = () => {
    fileInputRef.current?.click()
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setUploadResult(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="container">
      <h1>File Uploader with Security Scan</h1>
      
      <div className="upload-section">
        <div 
          className={`upload-area ${isDragOver ? 'dragover' : ''} ${selectedFile ? 'has-file' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openUploadArea}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
            accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.doc,.docx"
          />
          
          {selectedFile ? (
            <div className="file-info">
              <div className="file-name">📄 {selectedFile.name}</div>
              <div className="file-details">
                <div>Size: {formatFileSize(selectedFile.size)}</div>
                <div>Type: {selectedFile.type}</div>
                <div>Last modified: {formatDate(selectedFile.lastModified)}</div>
              </div>
            </div>
          ) : (
            <div>
              <div className="upload-text">
                <strong>Click to select a file</strong> or drag and drop
              </div>
              <div className="upload-text">
                Maximum file size: 10MB
              </div>
            </div>
          )}
        </div>

        <div className="file-types">
          <strong>Allowed file types:</strong> JPG, PNG, GIF, PDF, TXT, DOC, DOCX
        </div>

        {selectedFile && (
          <div>
            <button 
              className="upload-button primary"
              onClick={uploadFile}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload & Scan'}
            </button>
            <button 
              className="upload-button secondary"
              onClick={clearSelection}
              disabled={isUploading}
            >
              Clear Selection
            </button>
          </div>
        )}

        {isUploading && (
          <div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <div className="loading">
              <div className="spinner"></div>
              <span>Uploading... {uploadProgress}%</span>
            </div>
          </div>
        )}

        {uploadResult && (
          <div className={`scan-result ${uploadResult.file.scanResult.safe ? 'safe' : 'unsafe'}`}>
            <h4>
              {uploadResult.file.scanResult.safe ? '✅ File is safe' : '⚠️ Security threat detected'}
            </h4>
            <div className="file-details">
              <div><strong>File:</strong> {uploadResult.file.originalName}</div>
              <div><strong>Size:</strong> {formatFileSize(uploadResult.file.size)}</div>
              <div><strong>Hash:</strong> {uploadResult.file.hash}</div>
              <div><strong>Risk Level:</strong> {uploadResult.file.scanResult.risk}</div>
              {uploadResult.file.scanResult.threats.length > 0 && (
                <div>
                  <strong>Threats detected:</strong>
                  <ul className="threat-list">
                    {uploadResult.file.scanResult.threats.map((threat, index) => (
                      <li key={index}>{threat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>

      <div className="files-section">
        <div className="files-header">
          <h2>Uploaded Files</h2>
          <button className="upload-button secondary" onClick={fetchFiles}>
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading files...</span>
          </div>
        ) : files.length === 0 ? (
          <div className="upload-text">No files uploaded yet</div>
        ) : (
          <div className="files-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-item-info">
                  <div className="file-item-name">📄 {file.name}</div>
                  <div className="file-item-meta">
                    <div>Size: {formatFileSize(file.size)}</div>
                    <div>Uploaded: {formatDate(file.uploadTime)}</div>
                  </div>
                </div>
                <div className="file-item-actions">
                  <button 
                    className="danger"
                    onClick={() => deleteFile(file.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
