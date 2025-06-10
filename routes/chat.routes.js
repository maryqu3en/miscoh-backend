const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { chatMessageValidation, handleValidationErrors } = require('../middleware/validateFields');

router.post('/', authMiddleware, chatMessageValidation, handleValidationErrors, chatController.addMessage);

router.get('/:sessionId', authMiddleware, chatController.getMessagesBySession);

router.delete('/session/:sessionId', authMiddleware, chatController.deleteMessagesBySession);

router.delete('/:id', authMiddleware, chatController.deleteMessageById);

module.exports = router;