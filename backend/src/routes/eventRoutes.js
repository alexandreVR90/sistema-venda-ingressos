const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

// Apenas admins podem criar/editar eventos
router.post('/', authMiddleware('admin'), eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', authMiddleware('admin'), eventController.updateEvent);
router.delete('/:id', authMiddleware('admin'), eventController.deleteEvent);

module.exports = router;
