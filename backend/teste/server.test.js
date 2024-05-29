const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('../src/routes/auth');
const projectRoutes = require('../src/routes/project');

// Carregar variáveis de ambiente
dotenv.config();

// Configuração do aplicativo
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

describe('API Endpoints', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should respond with a 200 status code on /api/auth endpoint', async () => {
    const res = await request(app).get('/api/auth');
    expect(res.statusCode).toEqual(200);
  });

  it('should respond with a 200 status code on /api/projects endpoint', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toEqual(200);
  });
});

module.exports = app;
