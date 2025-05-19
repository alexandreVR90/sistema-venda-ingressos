const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { name, date, location } = req.body;
    const event = await Event.create({ name, date, location });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Evento não encontrado' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Evento não encontrado' });
    const { name, date, location } = req.body;
    await event.update({ name, date, location });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Evento não encontrado' });
    await event.destroy();
    res.json({ message: 'Evento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
