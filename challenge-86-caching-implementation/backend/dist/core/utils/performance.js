"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDuration = exports.endTimer = exports.startTimer = void 0;
const startTimer = () => ({
    startTime: Date.now(),
});
exports.startTimer = startTimer;
const endTimer = (metrics) => {
    metrics.endTime = Date.now();
    metrics.duration = metrics.endTime - metrics.startTime;
    return metrics;
};
exports.endTimer = endTimer;
const formatDuration = (ms) => {
    if (ms < 1000)
        return `${ms}ms`;
    if (ms < 60000)
        return `${(ms / 1000).toFixed(2)}s`;
    return `${(ms / 60000).toFixed(2)}min`;
};
exports.formatDuration = formatDuration;
//# sourceMappingURL=performance.js.map