const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/server');
const Project = require('../src/models/Project');
const jwt = require('jsonwebtoken');

describe('Confirm Support API', () => {
  let mongoServer;
  let token;
  let projectId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.disconnect();
    await mongoose.connect(mongoUri);

    const creatorId = new mongoose.Types.ObjectId();

    // Create a project to confirm support for
    const project = new Project({
      title: 'Support Confirmation Test',
      description: 'Project to confirm support',
      goal: 1000,
      image: 'http://example.com/image.jpg',
      deadline: '2024-12-31',
      category: 'Tecnologia',
      author: 'Test User',
      chavePix: '1234567890',
      creator: creatorId,
    });
    await project.save();

    projectId = project._id;

    token = jwt.sign({ user: { id: creatorId } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }, 30000);

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  }, 30000);

  describe('POST /api/projects/confirm-support', () => {
    it('should confirm support for a project and update progress', async () => {
      const res = await request(app)
        .post('/api/projects/confirm-support')
        .set('x-auth-token', token)
        .send({
          projectId: projectId.toString(),
          amount: 200,  // Support amount
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('supported', 200);
      expect(res.body).toHaveProperty('supporters', 1);
      expect(res.body).toHaveProperty('progress');
      expect(res.body.progress).toBeGreaterThan(0);  // Check that progress is updated
    });

    it('should return 404 if the project does not exist', async () => {
      const nonExistentProjectId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .post('/api/projects/confirm-support')
        .set('x-auth-token', token)
        .send({
          projectId: nonExistentProjectId.toString(),
          amount: 200,
        });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', 'Projeto não encontrado');
    });
  });
});
