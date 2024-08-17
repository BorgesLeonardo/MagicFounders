const mongoose = require('mongoose');
const Project = require('../models/Project');
const qrcode = require('qrcode');
const logger = require('../config/logger');

const validCategories = ['Artes', 'Tecnologia', 'Inovação', 'Leitura', 'Natureza', 'Jogos', 'Culinária', 'Podcast', 'Áudio visual', 'Revista', 'Autor', 'Outros'];

const createProject = async (req, res) => {
    const { title, description, goal, image, deadline, category, author, chavePix } = req.body;
    const user = req.user.id;

    logger.debug(`Requisição recebida para criar projeto com dados: ${JSON.stringify(req.body)}`);

    if (!validCategories.includes(category)) {
        logger.warn(`Categoria inválida: ${category}`);
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

        logger.info(`Projeto criado com sucesso: ${project._id}`);

        res.status(201).json(project);
    } catch (error) {
        logger.error(`Erro ao criar projeto: ${error.message}`);
        res.status(500).json({ error: 'Erro ao criar projeto' });
    }
};

const supportProject = async (req, res) => {
    const { projectId, amount } = req.body;
    logger.debug(`Requisição recebida para suporte ao projeto ID: ${projectId} com valor: ${amount}`);

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            logger.warn(`Projeto não encontrado: ${projectId}`);
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        const qrCodeData = `00020126330014BR.GOV.BCB.PIX0114${project.chavePix}5204000053039865405${amount.toFixed(2).replace('.', '')}5802BR5913${project.creator}6009Cidade${project.title}`;
        const qrCodeImage = await qrcode.toDataURL(qrCodeData);

        logger.info(`QR Code gerado para projeto ID: ${projectId}`);
        res.status(200).json({ qrCodeImage });
    } catch (error) {
        logger.error(`Erro ao gerar QR Code para projeto ID: ${projectId} - ${error.message}`);
        res.status(500).json({ error: 'Erro ao gerar QR Code' });
    }
};

const confirmSupport = async (req, res) => {
    const { projectId, amount } = req.body;
    logger.debug(`Requisição recebida para confirmação de suporte ao projeto ID: ${projectId} com valor: ${amount}`);

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            logger.warn(`Projeto não encontrado: ${projectId}`);
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        project.supported += amount;
        project.supporters += 1;
        project.progress = (project.supported / project.goal) * 100;

        await project.save();
        logger.info(`Suporte confirmado para projeto ID: ${projectId}`);
        res.status(200).json(project);
    } catch (error) {
        logger.error(`Erro crítico ao confirmar suporte para projeto ID: ${projectId} - ${error.message}`);
        res.status(500).json({ error: 'Erro crítico ao confirmar apoio ao projeto' });
    }
};

const getAllProjects = async (req, res) => {
    logger.debug('Requisição recebida para buscar todos os projetos');

    try {
        const projects = await Project.find();
        logger.info('Busca por todos os projetos realizada com sucesso');
        res.status(200).json(projects);
    } catch (error) {
        logger.error(`Erro ao buscar todos os projetos - ${error.message}`);
        res.status(500).json({ error: 'Erro ao buscar todos os projetos' });
    }
};

const getProjects = async (req, res) => {
    logger.debug('Requisição recebida para buscar uma lista de projetos limitados');

    try {
        const projects = await Project.find().limit(20);
        logger.info('Busca por projetos limitada a 20 realizada com sucesso');
        res.status(200).json(projects);
    } catch (error) {
        logger.error(`Erro ao buscar projetos limitados - ${error.message}`);
        res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
};

const getProjectById = async (req, res) => {
    const projectId = req.params.id;
    logger.debug(`Requisição recebida para buscar o projeto ID: ${projectId}`);

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            logger.warn(`Projeto não encontrado: ${projectId}`);
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }
        logger.info(`Projeto ID: ${projectId} encontrado com sucesso`);
        res.status(200).json(project);
    } catch (error) {
        logger.error(`Erro ao buscar projeto ID: ${projectId} - ${error.message}`);
        res.status(500).json({ error: 'Erro ao buscar projeto' });
    }
};

const updateProject = async (req, res) => {
    const { title, description, goal, image, deadline, category, author, chavePix } = req.body;
    const { id } = req.params;

    logger.debug(`Requisição recebida para atualizar o projeto ID: ${id}`);

    if (!title || !description || !goal || !image || !deadline || !category || !author || !chavePix) {
        logger.warn('Requisição de atualização do projeto faltando campos obrigatórios');
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const project = await Project.findById(id);
        if (!project) {
            logger.warn(`Projeto não encontrado: ${id}`);
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }

        if (project.creator.toString() !== req.user.id) {
            logger.warn(`Usuário sem permissão para atualizar o projeto ID: ${id}`);
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
        logger.info(`Projeto ID: ${id} atualizado com sucesso`);
        res.status(200).json({ message: 'Projeto atualizado com sucesso', project });
    } catch (error) {
        logger.error(`Erro ao atualizar projeto ID: ${id} - ${error.message}`);
        res.status(500).json({ message: 'Erro ao atualizar projeto', error });
    }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;
    logger.debug(`Requisição recebida para deletar o projeto ID: ${id}`);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`ID inválido fornecido: ${id}`);
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        const project = await Project.findById(id);

        if (!project) {
            logger.warn(`Projeto não encontrado: ${id}`);
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        if (project.creator.toString() !== req.user.id) {
            logger.warn(`Usuário sem permissão para deletar o projeto ID: ${id}`);
            return res.status(401).json({ error: 'Você não tem permissão para deletar este projeto' });
        }

        await Project.findByIdAndDelete(id);
        logger.info(`Projeto ID: ${id} deletado com sucesso`);
        res.status(200).json({ message: 'Projeto deletado com sucesso' });
    } catch (error) {
        logger.error(`Erro ao deletar projeto ID: ${id} - ${error.message}`);
        res.status(500).json({ error: 'Erro ao deletar projeto' });
    }
};

module.exports = { createProject, supportProject, confirmSupport, getProjectById, getProjects, getAllProjects, updateProject, deleteProject };
