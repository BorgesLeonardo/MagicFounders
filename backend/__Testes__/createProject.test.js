const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/server');
const User = require('../src/models/User');
const Project = require('../src/models/Project');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Create Project API', () => {
  let mongoServer;
  let token;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.disconnect();
    await mongoose.connect(mongoUri);

    const user = new User({
      name: 'Project User',
      email: 'projectuser@example.com',
      password: await bcrypt.hash('password123', 10),
    });
    await user.save();

    token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }, 30000); // Aumentar o tempo limite para 30 segundos

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  }, 30000); // Aumentar o tempo limite para 30 segundos

  describe('POST /api/projects/create', () => {
    it('should create a new project', async () => {
      const res = await request(app)
        .post('/api/projects/create')
        .set('x-auth-token', token)
        .send({
          title: 'New Project',
          description: 'This is a new project',
          goal: 1000,
          image: 'http://example.com/image.jpg',
          deadline: '2024-12-31',
          category: 'Tecnologia',
          author: 'Project User',
          chavePix: '1234567890'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('title', 'New Project');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/projects/create')
        .set('x-auth-token', token)
        .send({
          title: 'Incomplete Project'
        });

      expect(res.statusCode).toEqual(400);
    });
  });
});
