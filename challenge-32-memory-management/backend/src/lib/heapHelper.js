const heapdump = require('heapdump');
const path = require('path');
const fs = require('fs').promises;

class HeapHelper {
  static async captureSnapshot(filename) {
    return new Promise((resolve, reject) => {
      const snapshotDir = process.env.HEAP_SNAPSHOT_DIR || './snapshots';
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const defaultFilename = `heapdump-${timestamp}.heapsnapshot`;
      const fullPath = path.join(snapshotDir, filename || defaultFilename);
      
      // Ensure snapshot directory exists
      fs.mkdir(snapshotDir, { recursive: true }).catch(() => {});
      
      heapdump.writeSnapshot(fullPath, (err, filename) => {
        if (err) {
          reject(err);
        } else {
          resolve(filename);
        }
      });
    });
  }
  
  static async listSnapshots() {
    const snapshotDir = process.env.HEAP_SNAPSHOT_DIR || './snapshots';
    try {
      const files = await fs.readdir(snapshotDir);
      return files.filter(file => file.endsWith('.heapsnapshot'));
    } catch (error) {
      return [];
    }
  }
  
  static async deleteSnapshot(filename) {
    const snapshotDir = process.env.HEAP_SNAPSHOT_DIR || './snapshots';
    const fullPath = path.join(snapshotDir, filename);
    await fs.unlink(fullPath);
  }
}

module.exports = HeapHelper;