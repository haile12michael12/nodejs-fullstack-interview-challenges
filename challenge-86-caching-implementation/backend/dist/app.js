"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const loggingMiddleware_1 = require("./middleware/loggingMiddleware");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const routes_1 = require("./presentation/routes");
const CacheFactory_1 = require("./infrastructure/cache/CacheFactory");
const CacheService_1 = require("./application/services/CacheService");
const CacheController_1 = require("./presentation/controllers/CacheController");
const GetCacheStatsUseCase_1 = require("./application/usecases/GetCacheStatsUseCase");
const InvalidateCacheUseCase_1 = require("./application/usecases/InvalidateCacheUseCase");
const WarmCacheUseCase_1 = require("./application/usecases/WarmCacheUseCase");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(loggingMiddleware_1.loggingMiddleware);
const initializeCache = async () => {
    const cacheFactory = CacheFactory_1.CacheFactory.getInstance();
    const cacheProvider = await cacheFactory.createCacheProvider(process.env.REDIS_URL ? 'redis' : 'memory');
    const cacheService = new CacheService_1.CacheService(cacheProvider);
    const getCacheStatsUseCase = new GetCacheStatsUseCase_1.GetCacheStatsUseCase(cacheService);
    const invalidateCacheUseCase = new InvalidateCacheUseCase_1.InvalidateCacheUseCase(cacheService);
    const warmCacheUseCase = new WarmCacheUseCase_1.WarmCacheUseCase(cacheService);
    const cacheController = new CacheController_1.CacheController(getCacheStatsUseCase, invalidateCacheUseCase, warmCacheUseCase);
    const router = (0, express_1.Router)();
    (0, routes_1.registerRoutes)(router, cacheController);
    app.use('/api', router);
};
initializeCache().catch((error) => {
    console.error('Failed to initialize cache:', error);
    process.exit(1);
});
app.use(errorMiddleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map