require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Rotas (iremos criar depois)
const jogosRoutes = require('./routes/jogos');
app.use('/api/jogos', jogosRoutes);

app.get('/', (req, res) => {
  res.send('API de Venda de Ingressos funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
