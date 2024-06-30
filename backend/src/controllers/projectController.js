const mongoose = require('mongoose');
const Project = require('../models/Project');
const qrcode = require('qrcode');

const validCategories = ['Artes', 'Tecnologia', 'Inovação', 'Leitura', 'Natureza', 'Jogos', 'Culinária', 'Podcast', 'Áudio visual', 'Revista', 'Outros'];

// Função para criar um projeto
const createProject = async (req, res) => {
    const { title, description, goal, image, deadline, category, author, chavePix } = req.body;
    const user = req.user.id;

    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'Categoria inválida. As categorias permitidas são: ' + validCategories.join(', ') });
    }

    try {
        const project = new Project({
            title,
            description,
            goal,
            image,
            deadline,
            category,
            author,
            creator: user,
            chavePix,
        });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao criar projeto' });
    }
};

const supportProject = async (req, res) => {
    const { projectId, amount } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        // Gerar QR Code usando a chave Pix do projeto
        const qrCodeData = `00020126330014BR.GOV.BCB.PIX0114${project.chavePix}5204000053039865405${amount.toFixed(2).replace('.', '')}5802BR5913${project.author}6009Cidade${project.title}`;
        const qrCodeImage = await qrcode.toDataURL(qrCodeData);

        res.status(200).json({ qrCodeImage });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao gerar QR Code' });
    }
};

const confirmSupport = async (req, res) => {
    const { projectId, amount } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        project.supported += amount;
        project.supporters += 1;
        project.progress = (project.supported / project.goal) * 100;

        await project.save();

        res.status(200).json(project);
    } catch (error) {
        console.error(error.message);
        res.status500().json({ error: 'Erro ao confirmar apoio ao projeto' });
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
};

// Função para buscar todos os projetos com limite
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().limit(20);
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
    const { title, description, goal, image, deadline, category, author, chavePix } = req.body;
    const { id } = req.params;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!title || !description || !goal || !image || !deadline || !category || !author || !chavePix) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }

        // Verifica se o usuário é o criador do projeto
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Você não tem permissão para atualizar este projeto' });
        }

        project.title = title;
        project.description = description;
        project.goal = goal;
        project.image = image;
        project.deadline = deadline;
        project.category = category;
        project.author = author;
        project.chavePix = chavePix;

        await project.save();
        res.status(200).json({ message: 'Projeto atualizado com sucesso', project });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro ao atualizar projeto', error });
    }
};

// Função para deletar um projeto por ID
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o ID é válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('ID inválido:', id);
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        const project = await Project.findById(id);

        if (!project) {
            console.log('Projeto não encontrado:', id);
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        // Verifica se o usuário é o criador do projeto
        if (project.creator.toString() !== req.user.id) {
            console.log('Usuário sem permissão:', req.user.id);
            return res.status(401).json({ error: 'Você não tem permissão para deletar este projeto' });
        }

        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: 'Projeto deletado com sucesso' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao deletar projeto' });
    }
};

module.exports = { supportProject, confirmSupport, createProject, getProjects, getAllProjects, getProjectById, updateProject, deleteProject };
