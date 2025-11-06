"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const ErrorHandler_1 = require("../core/errors/ErrorHandler");
const logger_1 = __importDefault(require("../core/utils/logger"));
const errorMiddleware = (err, req, res, next) => {
    const error = (0, ErrorHandler_1.errorHandler)(err);
    logger_1.default.error(`Error ${error.statusCode}: ${error.message}`, {
        stack: err.stack,
        url: req.url,
        method: req.method,
    });
    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map