const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const {
  registerValidation,
  loginValidation,
  handleValidationErrors,
} = require('../middleware/validateFields');

router.post('/register', registerValidation, handleValidationErrors, authController.register);

router.post('/login', loginValidation, handleValidationErrors, authController.login);

router.get('/me', authMiddleware, authController.me);

module.exports = router;