"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheRoutes = void 0;
const express_1 = require("express");
const cacheRoutes = (cacheController) => {
    const router = (0, express_1.Router)();
    router.get('/stats', cacheController.getStats);
    router.post('/invalidate', cacheController.invalidate);
    router.post('/warm', cacheController.warm);
    return router;
};
exports.cacheRoutes = cacheRoutes;
//# sourceMappingURL=cache.routes.js.map