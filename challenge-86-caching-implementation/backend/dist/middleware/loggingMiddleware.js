"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
const logger_1 = __importDefault(require("../core/utils/logger"));
const loggingMiddleware = (req, res, next) => {
    const start = Date.now();
    logger_1.default.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
        method: req.method,
        url: req.originalUrl,
        query: req.query,
        body: req.body,
    });
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger_1.default.info(`Response: ${res.statusCode} ${duration}ms`, {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
        });
    });
    next();
};
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=loggingMiddleware.js.map