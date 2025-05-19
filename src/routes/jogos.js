const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os jogos
router.get('/', async (req, res) => {
  try {
    const jogos = await prisma.jogo.findMany();
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

// Criar um novo jogo
router.post('/', async (req, res) => {
  const { nome, data, local } = req.body;
  try {
    const novoJogo = await prisma.jogo.create({
      data: {
        nome,
        data: new Date(data),
        local,
      },
    });
    res.status(201).json(novoJogo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar jogo' });
  }
});

module.exports = router;
