const BackupService = require('../src/backupService');

describe('Backup Service', () => {
  test('should create a backup', async () => {
    const backup = await BackupService.createBackup('test-backup');
    expect(backup).toHaveProperty('filename');
    expect(backup).toHaveProperty('size');
    expect(backup).toHaveProperty('createdAt');
  });

  test('should list backups', async () => {
    await BackupService.createBackup('test-backup-1');
    await BackupService.createBackup('test-backup-2');
    
    const backups = await BackupService.listBackups();
    expect(backups.length).toBeGreaterThanOrEqual(2);
  });

  test('should delete a backup', async () => {
    const backup = await BackupService.createBackup('test-backup-to-delete');
    await expect(BackupService.deleteBackup(backup.filename)).resolves.not.toThrow();
  });
});