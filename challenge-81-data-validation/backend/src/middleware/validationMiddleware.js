const { userCreateSchema, userUpdateSchema } = require('../schemas/userSchema');
const { productCreateSchema, productUpdateSchema } = require('../schemas/productSchema');

// Generic validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    // Update request body with validated data
    req.body = value;
    next();
  };
};

// Specific validation middlewares
const validateUserCreate = validate(userCreateSchema);
const validateUserUpdate = validate(userUpdateSchema);
const validateProductCreate = validate(productCreateSchema);
const validateProductUpdate = validate(productUpdateSchema);

module.exports = {
  validate,
  validateUserCreate,
  validateUserUpdate,
  validateProductCreate,
  validateProductUpdate
};