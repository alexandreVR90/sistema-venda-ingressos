const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { Op } = require('sequelize');

exports.getDashboardStats = async (req, res) => {
  try {
    // Total de eventos
    const totalEvents = await Event.count();

    // Total ingressos vendidos
    const totalTickets = await Ticket.count();

    // Total receita
    const totalRevenue = await Ticket.sum('price');

    // Últimos 5 ingressos vendidos
    const recentTickets = await Ticket.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
      include: [User, Event],
    });

    res.json({
      totalEvents,
      totalTickets,
      totalRevenue,
      recentTickets,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
