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

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado...'))
  .catch(err => console.error(err));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/project'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));