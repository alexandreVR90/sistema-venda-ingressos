const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./Event');
const User = require('./User');

const Ticket = sequelize.define('Ticket', {
  category: {
    type: DataTypes.ENUM('Arquibancada', 'Camarote', 'VIP'),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barcode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('valid', 'used', 'cancelled'),
    defaultValue: 'valid',
  }
});

// Relacionamentos
Ticket.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(Ticket, { foreignKey: 'eventId' });

Ticket.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Ticket, { foreignKey: 'userId' });

module.exports = Ticket;
