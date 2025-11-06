"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const cache_routes_1 = require("./cache.routes");
const registerRoutes = (router, cacheController) => {
    router.use('/cache', (0, cache_routes_1.cacheRoutes)(cacheController));
    router.get('/health', (req, res) => {
        res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });
    router.all('*', (req, res) => {
        res.status(404).json({
            success: false,
            message: 'Route not found'
        });
    });
};
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=index.js.map