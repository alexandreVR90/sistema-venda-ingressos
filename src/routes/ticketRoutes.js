const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');

// Usuário autenticado compra ingresso
router.post('/buy', authMiddleware('user'), ticketController.buyTicket);
router.get('/my-tickets', authMiddleware('user'), ticketController.getUserTickets);

module.exports = router;
