const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/server');
const Project = require('../src/models/Project');
const jwt = require('jsonwebtoken');
const qrcode = require('qrcode');

jest.mock('qrcode'); // Mocking the QR code generation

describe('Support Project API', () => {
  let mongoServer;
  let token;
  let projectId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.disconnect();
    await mongoose.connect(mongoUri);

    // Use a valid ObjectId for creator
    const creatorId = new mongoose.Types.ObjectId(); // Corrected with `new`

    // Create a project
    const project = new Project({
      title: 'Project for Support',
      description: 'This project is for support',
      goal: 500,
      image: 'http://example.com/image.jpg',
      deadline: '2024-12-31',
      category: 'Tecnologia',
      author: 'Project User',
      chavePix: '1234567890',
      creator: creatorId,  // Corrected this line
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

  describe('POST /api/projects/support', () => {
    it('should generate a QR code for supporting a project', async () => {
      qrcode.toDataURL.mockResolvedValue('mockQRCode'); // Mocking QR Code return

      const res = await request(app)
        .post('/api/projects/support')
        .set('x-auth-token', token)
        .send({
          projectId: projectId.toString(),
          amount: 50,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('qrCodeImage', 'mockQRCode');
    });
  });
});
