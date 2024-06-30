const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Certifique-se de que o caminho está correto
const auth = require('../middleware/auth'); // Middleware de autenticação
const router = express.Router();

// Registrar usuário
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // Certifique-se de que 'name' está incluído aqui
    
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login solicitado:', email, password);

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id } }); // Retorna o token e o ID do usuário
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Deletar usuário
router.delete('/delete', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      await User.findByIdAndDelete(req.user.id);
  
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  });

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

/// Solicitar redefinição de senha
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const token = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

        await user.save();

        const resetLink = `http://${req.headers.host}/reset-password/${token}`;

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Redefinição de senha',
            text: `Você está recebendo este email porque você (ou alguém) solicitou a redefinição da senha da sua conta.\n\n` +
                  `Por favor, clique no link ou cole no seu navegador para concluir o processo:\n\n` +
                  `http://localhost:8080/reset-password/${token}\n\n` +
                  `Se você não solicitou isso, por favor ignore este email e sua senha permanecerá inalterada.\n`,
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('Erro ao enviar email:', err);
                return res.status(500).send('Erro ao enviar email');
            }
            res.status(200).json({ message: 'Email de redefinição de senha enviado com sucesso' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Redefinir senha
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    console.log('Redefinição de senha com token:', token);

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token inválido ou expirado' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Senha redefinida com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Servir a página de redefinição de senha
router.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'reset-password.html'));
});

// Rota de exemplo
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Auth route is working' });
  });

// Rota de exemplo
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Project route is working' });
  });

// Rota de exemplo
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Project route is working' });
});

module.exports = router;
