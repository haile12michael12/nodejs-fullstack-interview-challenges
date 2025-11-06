export interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
}

export const startTimer = (): PerformanceMetrics => ({
  startTime: Date.now(),
});

export const endTimer = (metrics: PerformanceMetrics): PerformanceMetrics => {
  metrics.endTime = Date.now();
  metrics.duration = metrics.endTime - metrics.startTime;
  return metrics;
};

export const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  return `${(ms / 60000).toFixed(2)}min`;
};