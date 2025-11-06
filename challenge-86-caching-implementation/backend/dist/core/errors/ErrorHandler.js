"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("./AppError");
const errorHandler = (err) => {
    if (err instanceof AppError_1.AppError) {
        return {
            message: err.message,
            statusCode: err.statusCode,
            isOperational: err.isOperational,
        };
    }
    return {
        message: 'Internal Server Error',
        statusCode: 500,
        isOperational: false,
    };
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorHandler.js.map