const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Somente admin pode acessar
router.get('/dashboard', authMiddleware('admin'), adminController.getDashboardStats);

module.exports = router;
