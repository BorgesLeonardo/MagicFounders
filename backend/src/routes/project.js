const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createProject, getProjects, getProjectById, updateProject, deleteProject, getAllProjects } = require('../controllers/projectController');

// Rota para criar um projeto
router.post('/create', auth, createProject);

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

// Rota para obter detalhes de um projeto específico
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar detalhes do projeto', error });
  }
});

module.exports = router;
