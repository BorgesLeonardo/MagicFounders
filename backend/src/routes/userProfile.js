const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserProfile, updateUserProfile } = require('../controllers/userProfileController');

router.get('/', auth, getUserProfile);
router.put('/', auth, updateUserProfile);

module.exports = router;
