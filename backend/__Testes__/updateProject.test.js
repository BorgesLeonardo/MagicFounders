// tests/updateProject.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/server');  // Certifique-se de importar o app aqui
const User = require('../src/models/User');
const Project = require('../src/models/Project');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Update Project API', () => {
  let mongoServer;
  let token;
  let projectId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Definir a URI do MongoDB dinamicamente
    process.env.MONGO_URI = mongoUri;

    // Fechar conexão existente antes de abrir uma nova
    await mongoose.disconnect();
    await mongoose.connect(mongoUri);

    // Cria um usuário para testes de atualização de projeto
    const user = new User({
      name: 'Project User',
      email: 'projectuser@example.com',
      password: await bcrypt.hash('password123', 10),
    });
    await user.save();

    token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Cria um projeto para ser atualizado
    const project = new Project({
      title: 'Old Project',
      description: 'This is an old project',
      goal: 1000,
      image: 'http://example.com/oldimage.jpg',
      deadline: '2024-12-31',
      category: 'Tecnologia',
      author: 'Project User',
      chavePix: '1234567890',
      creator: user._id // Adicionando o campo creator
    });
    await project.save();

    projectId = project._id;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('PUT /api/projects/:id', () => {
    it('should update an existing project', async () => {
      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .set('x-auth-token', token)
        .send({
          title: 'Updated Project',
          description: 'This is an updated project',
          goal: 1500,
          image: 'http://example.com/updatedimage.jpg',
          deadline: '2025-12-31',
          category: 'Outros',
          author: 'Updated User',
          chavePix: '0987654321',
          creator: 'Updated User' // Adicionando o campo creator
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.project).toHaveProperty('title', 'Updated Project');
      expect(res.body.project).toHaveProperty('description', 'This is an updated project');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .set('x-auth-token', token)
        .send({
          title: 'Incomplete Project'
          // Missing other required fields
        });

      console.log('Resposta recebida:', res.body); // Adicione este log

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Todos os campos são obrigatórios');
    });
  });
});
