"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
class CacheError extends AppError {
    constructor(message) {
        super(`Cache Error: ${message}`, 500);
    }
}
exports.CacheError = CacheError;
//# sourceMappingURL=AppError.js.map