const mongoose = require('mongoose');

const importErrorSchema = new mongoose.Schema({
  importId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Import',
    required: true
  },
  rowNumber: {
    type: Number,
    required: true
  },
  rowData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  errorMessage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ImportError = mongoose.model('ImportError', importErrorSchema);

module.exports = { ImportError };