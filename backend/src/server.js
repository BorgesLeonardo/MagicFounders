// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;

// Conectar ao MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB conectado...'))
  .catch(err => console.error(err));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/project'));

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app; // Exporta o app para ser usado nos testes
