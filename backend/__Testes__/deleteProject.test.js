const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/server');
const User = require('../src/models/User');
const Project = require('../src/models/Project');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Delete Project API', () => {
  let mongoServer;
  let userToken;
  let anotherUserToken;
  let userId;

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

    userId = user.id;
    userToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const anotherUser = new User({
      name: 'Another User',
      email: 'anotheruser@example.com',
      password: await bcrypt.hash('password123', 10),
    });
    await anotherUser.save();

    anotherUserToken = jwt.sign({ user: { id: anotherUser.id } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }, 30000); // Aumentar o tempo limite para 30 segundos

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  }, 30000); // Aumentar o tempo limite para 30 segundos

  const createProject = async (userId) => {
    const project = new Project({
      title: 'Project to be deleted',
      description: 'This project will be deleted',
      goal: 1000,
      image: 'http://example.com/image.jpg',
      deadline: '2024-12-31',
      category: 'Tecnologia',
      author: 'Project User',
      chavePix: '1234567890',
      creator: userId
    });
    await project.save();
    return project._id;
  };

  describe('DELETE /api/projects/:id', () => {
    it('should delete a project if the user is the creator', async () => {
      const projectId = await createProject(userId);
      const res = await request(app)
        .delete(`/api/projects/${projectId}`)
        .set('x-auth-token', userToken);

      console.log('Delete response for creator:', res.body);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Projeto deletado com sucesso');
    });

    it('should not delete a project if the user is not the creator', async () => {
      const projectId = await createProject(userId);
      const res = await request(app)
        .delete(`/api/projects/${projectId}`)
        .set('x-auth-token', anotherUserToken);

      console.log('Another user token:', anotherUserToken);
      console.log('Delete response for non-creator:', res.body);

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Você não tem permissão para deletar este projeto');
    });

    it('should return 404 if the project does not exist', async () => {
      const nonExistentProjectId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/projects/${nonExistentProjectId}`)
        .set('x-auth-token', userToken);

      console.log('Delete response for non-existent project:', res.body);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', 'Projeto não encontrado');
    });
  });
});
