const { body, validationResult, param } = require('express-validator');

const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .isLength({ min: 3, max: 32 }).withMessage('Username must be 3-32 characters.'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.'),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.'),
  body('password')
    .notEmpty().withMessage('Password is required.'),
];

const chatMessageValidation = [
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.'),
  body('role')
    .notEmpty().withMessage('Role is required.')
    .isIn(['user', 'assistant']).withMessage('Role must be user or assistant.'),
  body('session')
    .notEmpty().withMessage('Session ID is required.')
];

const sessionValidation = [
  body('title')
    .optional()
    .isLength({ max: 100 }).withMessage('Title must be less than 100 characters.'),
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  registerValidation,
  loginValidation,
  chatMessageValidation,
  sessionValidation,
  handleValidationErrors,
};