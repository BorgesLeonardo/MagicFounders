const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMessages, createMessage } = require('../controllers/messageController');

router.get('/:projectId', auth, getMessages);
router.post('/', auth, createMessage);

module.exports = router;
