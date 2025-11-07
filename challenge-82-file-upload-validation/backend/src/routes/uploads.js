const express = require('express');
const multer = require('multer');
const { validateFile } = require('../lib/validation');
const { saveFile, getFileMetadata, listFiles, deleteFile, getFilePath } = require('../lib/storage');
const { scanFileForVirus } = require('../lib/virus-scan');
const config = require('../config');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: config.upload.maxFileSize,
  },
});

// Upload file endpoint
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
        error: 'Please select a file to upload',
      });
    }

    // Validate file
    const validation = validateFile(req.file);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'File validation failed',
        errors: validation.errors,
      });
    }

    // Save file
    const fileMetadata = await saveFile(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // Scan for viruses (stub implementation)
    // In a real implementation, you would scan the file before saving
    const scanResult = await scanFileForVirus(fileMetadata.filePath);
    if (scanResult.isInfected) {
      // Delete infected file
      await deleteFile(fileMetadata.id);
      return res.status(400).json({
        success: false,
        message: 'File contains virus',
        error: 'Uploaded file contains malicious content',
        viruses: scanResult.viruses,
      });
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: fileMetadata,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message,
    });
  }
});

// Get file metadata endpoint
router.get('/:id', (req, res) => {
  try {
    const fileMetadata = getFileMetadata(req.params.id);
    if (!fileMetadata) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
        error: 'No file found with the provided ID',
      });
    }

    res.json({
      success: true,
      message: 'File retrieved successfully',
      data: fileMetadata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve file',
      error: error.message,
    });
  }
});

// Delete file endpoint
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteFile(req.params.id);
    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    if (error.message.includes('File not found')) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
        error: error.message,
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message,
    });
  }
});

// List files endpoint
router.get('/', (req, res) => {
  try {
    const files = listFiles();
    res.json({
      success: true,
      message: 'Files retrieved successfully',
      data: files,
      meta: {
        count: files.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to list files',
      error: error.message,
    });
  }
});

module.exports = router;