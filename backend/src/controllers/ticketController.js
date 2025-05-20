const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

exports.buyTicket = async (req, res) => {
  try {
    const { eventId, category, paymentMethod } = req.body;
    const userId = req.user.id;  // req.user populado pelo middleware auth

    // Busca evento e preço
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: 'Evento não encontrado' });

    const prices = {
      Arquibancada: 50,
      Camarote: 150,
      VIP: 300,
    };

    const price = prices[category];
    if (!price) return res.status(400).json({ message: 'Categoria inválida' });

    // Gerar código de barras único (barcode)
    const barcode = uuidv4();

    const ticket = await Ticket.create({
      eventId,
      userId,
      category,
      price,
      paymentMethod,
      barcode,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await Ticket.findAll({ where: { userId }, include: Event });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
