// tests/login.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/server');  // Certifique-se de importar o app aqui
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Login API', () => {
  let mongoServer;
  let token;
  let userId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Definir a URI do MongoDB dinamicamente
    process.env.MONGO_URI = mongoUri;

    // Fechar conexão existente antes de abrir uma nova
    await mongoose.disconnect();
    await mongoose.connect(mongoUri);

    // Cria um usuário para testes de login
    const user = new User({
      name: 'Login User',
      email: 'loginuser@example.com',
      password: await bcrypt.hash('password123', 10),
    });
    await user.save();

    token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    userId = user.id;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('POST /api/auth/login', () => {
    it('should login a user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'loginuser@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrongemail@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Credenciais inválidas');
    });
  });
});
