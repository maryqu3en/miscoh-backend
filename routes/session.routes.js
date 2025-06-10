const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/session.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { sessionValidation, handleValidationErrors } = require('../middleware/validateFields');

router.post('/', authMiddleware, sessionValidation, handleValidationErrors, sessionController.createSession);

router.get('/', authMiddleware, sessionController.getSessionsByUser);

router.get('/:id', authMiddleware, sessionController.getSessionById);

router.delete('/:id', authMiddleware, sessionController.deleteSessionById);

module.exports = router;