"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const logger_1 = __importDefault(require("./core/utils/logger"));
const PORT = config_1.config.port;
const server = app_1.default.listen(PORT, () => {
    logger_1.default.info(`Server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
});
process.on('SIGTERM', () => {
    logger_1.default.info('SIGTERM received, shutting down gracefully');
    server.close(() => {
        logger_1.default.info('Process terminated');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    logger_1.default.info('SIGINT received, shutting down gracefully');
    server.close(() => {
        logger_1.default.info('Process terminated');
        process.exit(0);
    });
});
//# sourceMappingURL=server.js.map