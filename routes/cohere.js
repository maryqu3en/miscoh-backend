const express = require('express');
const router = express.Router();
const cohereController = require('../controllers/cohere.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/generate', authMiddleware, cohereController.generate);
router.get('/health', cohereController.health);

module.exports = router;
