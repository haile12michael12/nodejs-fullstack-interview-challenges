const JobService = require('../../src/infrastructure/services/JobService');
const JobEntity = require('../../src/core/entities/JobEntity');

// Mock the job queue repository
jest.mock('../../src/infrastructure/repositories/BullJobQueueRepository');

describe('JobService', () => {
  let jobService;
  let mockJobQueueRepository;

  beforeEach(() => {
    mockJobQueueRepository = {
      addJob: jest.fn(),
      getJob: jest.fn(),
      getJobsByStatus: jest.fn(),
      updateJobStatus: jest.fn(),
    };

    jobService = new JobService(mockJobQueueRepository);
  });

  describe('createJob', () => {
    it('should create a new job', async () => {
      const jobData = {
        type: 'email',
        payload: { to: 'test@example.com', subject: 'Test' },
      };

      const expectedJob = new JobEntity(
        '1',
        jobData.type,
        jobData.payload,
        'pending',
        new Date(),
        new Date()
      );

      mockJobQueueRepository.addJob.mockResolvedValue(expectedJob);

      const result = await jobService.createJob(jobData.type, jobData.payload);

      expect(result).toEqual(expectedJob);
      expect(mockJobQueueRepository.addJob).toHaveBeenCalledWith(jobData);
    });

    it('should throw an error if job creation fails', async () => {
      const jobData = {
        type: 'email',
        payload: { to: 'test@example.com', subject: 'Test' },
      };

      mockJobQueueRepository.addJob.mockRejectedValue(new Error('Database error'));

      await expect(jobService.createJob(jobData.type, jobData.payload))
        .rejects
        .toThrow('Database error');
    });
  });

  describe('getJobById', () => {
    it('should return a job if found', async () => {
      const job = new JobEntity(
        '1',
        'email',
        { to: 'test@example.com', subject: 'Test' },
        'completed',
        new Date(),
        new Date()
      );

      mockJobQueueRepository.getJob.mockResolvedValue(job);

      const result = await jobService.getJobById('1');

      expect(result).toEqual(job);
      expect(mockJobQueueRepository.getJob).toHaveBeenCalledWith('1');
    });

    it('should return null if job is not found', async () => {
      mockJobQueueRepository.getJob.mockResolvedValue(null);

      const result = await jobService.getJobById('999');

      expect(result).toBeNull();
    });
  });

  describe('getAllJobs', () => {
    it('should return all jobs', async () => {
      const jobs = [
        new JobEntity('1', 'email', { to: 'test1@example.com' }, 'completed'),
        new JobEntity('2', 'email', { to: 'test2@example.com' }, 'pending'),
      ];

      mockJobQueueRepository.getJobsByStatus
        .mockResolvedValueOnce([]) // waiting
        .mockResolvedValueOnce([]) // active
        .mockResolvedValueOnce([jobs[0]]) // completed
        .mockResolvedValueOnce([jobs[1]]); // failed

      const result = await jobService.getAllJobs();

      expect(result).toHaveLength(2);
      expect(result).toEqual(expect.arrayContaining(jobs));
    });
  });
});