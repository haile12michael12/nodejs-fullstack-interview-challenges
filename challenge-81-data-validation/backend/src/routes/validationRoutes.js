const express = require('express');
const { validateUserCreate, validateUserUpdate, validateProductCreate, validateProductUpdate } = require('../middleware/validationMiddleware');
const { create: createUser, getById: getUserById, getAll: getAllUsers, update: updateUser, remove: deleteUser, validate: validateUser } = require('../controllers/userController');
const { create: createProduct, getById: getProductById, getAll: getAllProducts, update: updateProduct, remove: deleteProduct, validate: validateProduct } = require('../controllers/productController');

const router = express.Router();

// User routes
router.post('/user', validateUserCreate, createUser);
router.get('/user/:id', getUserById);
router.get('/users', getAllUsers);
router.put('/user/:id', validateUserUpdate, updateUser);
router.delete('/user/:id', deleteUser);
router.post('/validate/user', validateUserCreate, validateUser);

// Product routes
router.post('/product', validateProductCreate, createProduct);
router.get('/product/:id', getProductById);
router.get('/products', getAllProducts);
router.put('/product/:id', validateProductUpdate, updateProduct);
router.delete('/product/:id', deleteProduct);
router.post('/validate/product', validateProductCreate, validateProduct);

// Get validation rules endpoint
router.get('/validation/rules', (req, res) => {
  res.json({
    success: true,
    message: 'Validation rules retrieved successfully',
    data: {
      user: {
        firstName: 'string, min 2, max 50, required',
        lastName: 'string, min 2, max 50, required',
        email: 'valid email, required',
        age: 'integer, min 13, max 120, required',
        phone: 'string, 10-15 digits, optional',
        address: {
          street: 'string, max 100, required',
          city: 'string, max 50, required',
          state: 'string, exactly 2 characters, required',
          zipCode: 'string, 5 digits or 5+4 format, required',
          country: 'string, max 50, default USA'
        },
        preferences: {
          newsletter: 'boolean, default false',
          notifications: 'boolean, default true',
          theme: 'string, light or dark, default light'
        }
      },
      product: {
        name: 'string, min 3, max 100, required',
        description: 'string, max 1000, optional',
        price: 'number, precision 2, min 0, required',
        category: 'string, electronics|clothing|books|home|sports, required',
        inStock: 'boolean, default true',
        tags: 'array of strings, max 10 items, each 2-20 chars, optional',
        specifications: 'object, optional'
      }
    }
  });
});

module.exports = router;