const Project = require('../models/Project');

// Função para criar um projeto
const createProject = async (req, res) => {
    const { title, description, goal, image, deadline, category, author, daysLeft } = req.body;
    const user = req.user.id;

    try {
        const project = new Project({
            title,
            description,
            goal,
            image,
            deadline,
            category,
            author,
            daysLeft,
            creator: user,
        });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao criar projeto' });
    }
};

// Função para buscar todos os projetos
const getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro ao buscar todos os projetos' });
    }
}

// Função para buscar todos os projetos com limite
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().limit(3);
        res.status(200).json(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
};

// Função para buscar um projeto por ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao buscar projeto' });
    }
};

// Função para atualizar um projeto por ID
const updateProject = async (req, res) => {
    const { title, author, description, goal, image, deadline, category, daysLeft, supporters, supported, progress, } = req.body;
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        project.title = title || project.title;
        project.author = author || project.author;
        project.description = description || project.description;
        project.goal = goal || project.goal;
        project.image = image || project.image;
        project.deadline = deadline || project.deadline;
        project.category = category || project.category;
        project.daysLeft = daysLeft || project.daysLeft;
        project.progress = progress || project.progress;
        project.supported = supported || project.supported;
        project.supporters = supporters || project.supporters;

        await project.save();
        res.status(200).json(project);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao atualizar projeto' });
    }
};

// Função para deletar um projeto por ID
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }
        await project.remove();
        res.status(200).json({ message: 'Projeto removido com sucesso' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao deletar projeto' });
    }
};

module.exports = { createProject, getProjects, getAllProjects, getProjectById, updateProject, deleteProject };
