require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const app = express();
const PORT = process.env.PORT || 5000;
const eventRoutes = require('./src/routes/eventRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
const adminRoutes = require('./src/routes/adminRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);

// Rota inicial de teste
app.get('/', (req, res) => {
  res.send('API de Venda de Ingressos - Online');
});

// Sincronizar os modelos e conectar ao banco antes de iniciar o servidor
sequelize.sync({ alter: true })  // altera a estrutura automaticamente (ideal para dev)
  .then(() => {
    console.log('Modelos sincronizados com banco de dados');

    return sequelize.authenticate();  // conecta ao banco
  })
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ou sincronizar banco de dados:', err);
  });
