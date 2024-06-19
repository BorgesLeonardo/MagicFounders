const UserProfile = require('../models/UserProfile');

exports.getUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findOne({ userId: req.user.id });
        if (!userProfile) {
            return res.status(404).json({ error: 'Perfil não encontrado' });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { bio, website, socialLinks, avatar } = req.body;
        const userProfile = await UserProfile.findOneAndUpdate(
            { userId: req.user.id },
            { bio, website, socialLinks, avatar },
            { new: true, upsert: true }
        );
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
};
