const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createProject, supportProject, confirmSupport, getProjects, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');

// Rota para criar um projeto
router.post('/create', auth, createProject);

// Rota para apoiar um projeto
router.post('/support', auth, supportProject);

// Rota para confirmar o apoio a um projeto
router.post('/confirm-support', auth, confirmSupport);

// Rota para buscar todos os projetos com limite
router.get('/limit', auth, getProjects);

// Rota para buscar todos os projetos
router.get('/all', auth, getAllProjects);

// Rota para buscar um projeto por ID
router.get('/:id', auth, getProjectById);

// Rota para atualizar um projeto por ID
router.put('/:id', auth, updateProject);

// Rota para deletar um projeto por ID
router.delete('/:id', auth, deleteProject);

// Rota de exemplo
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Project route is working' });
});

module.exports = router;
