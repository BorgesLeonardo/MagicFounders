const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ projectId: req.params.projectId }).sort('timestamp');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar mensagens' });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const { projectId, content } = req.body;
        const userId = req.user.id;
        const username = req.user.username; // Supondo que o nome de usuário está disponível no token

        const message = new Message({
            projectId,
            userId,
            username,
            content
        });

        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar mensagem' });
    }
};
