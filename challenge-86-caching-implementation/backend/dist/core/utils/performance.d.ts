export interface PerformanceMetrics {
    startTime: number;
    endTime?: number;
    duration?: number;
}
export declare const startTimer: () => PerformanceMetrics;
export declare const endTimer: (metrics: PerformanceMetrics) => PerformanceMetrics;
export declare const formatDuration: (ms: number) => string;
//# sourceMappingURL=performance.d.ts.map