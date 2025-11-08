const CorsService = require('../services/cors.service');
const { successResponse, errorResponse, validationErrorResponse } = require('../utils/response.util');

class CorsController {
  constructor() {
    this.corsService = new CorsService();
  }

  // Get current CORS configuration
  getConfig = (req, res) => {
    try {
      const config = this.corsService.getCurrentConfig();
      return successResponse(res, config, 'CORS configuration retrieved successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to retrieve CORS configuration');
    }
  };

  // Update CORS configuration
  updateConfig = (req, res) => {
    try {
      const { origin, credentials, methods, allowedHeaders, exposedHeaders, maxAge } = req.body;
      
      // Validate input
      if (origin === undefined && credentials === undefined && methods === undefined && 
          allowedHeaders === undefined && exposedHeaders === undefined && maxAge === undefined) {
        return validationErrorResponse(res, { message: 'At least one configuration parameter is required' });
      }
      
      // Build new config object
      const newConfig = {};
      if (origin !== undefined) newConfig.origin = origin;
      if (credentials !== undefined) newConfig.credentials = credentials;
      if (methods !== undefined) newConfig.methods = methods;
      if (allowedHeaders !== undefined) newConfig.allowedHeaders = allowedHeaders;
      if (exposedHeaders !== undefined) newConfig.exposedHeaders = exposedHeaders;
      if (maxAge !== undefined) newConfig.maxAge = maxAge;
      
      const updatedConfig = this.corsService.updateConfig(newConfig);
      return successResponse(res, updatedConfig, 'CORS configuration updated successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to update CORS configuration');
    }
  };

  // Get allowed origins
  getAllowedOrigins = (req, res) => {
    try {
      const origins = this.corsService.getAllowedOrigins();
      return successResponse(res, origins, 'Allowed origins retrieved successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to retrieve allowed origins');
    }
  };

  // Add origin to whitelist
  addOrigin = (req, res) => {
    try {
      const { origin } = req.body;
      
      if (!origin) {
        return validationErrorResponse(res, { origin: 'Origin is required' });
      }
      
      const updatedOrigins = this.corsService.addOriginToWhitelist(origin);
      return successResponse(res, updatedOrigins, 'Origin added to whitelist successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to add origin to whitelist');
    }
  };

  // Remove origin from whitelist
  removeOrigin = (req, res) => {
    try {
      const { origin } = req.body;
      
      if (!origin) {
        return validationErrorResponse(res, { origin: 'Origin is required' });
      }
      
      const updatedOrigins = this.corsService.removeOriginFromWhitelist(origin);
      return successResponse(res, updatedOrigins, 'Origin removed from whitelist successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to remove origin from whitelist');
    }
  };
}

module.exports = CorsController;