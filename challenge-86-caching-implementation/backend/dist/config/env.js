"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || '3000', 10),
    cache: {
        ttl: parseInt(process.env.CACHE_TTL || '300', 10),
        maxItems: parseInt(process.env.CACHE_MAX_ITEMS || '1000', 10),
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
};
//# sourceMappingURL=env.js.map