const express = require('express');
const { getProfile, updateProfile, deleteAccount } = require('./controllers/playerController');
const { verifyToken, isPlayer } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get player profile
router.get('/profile', verifyToken, isPlayer, getProfile);

// Update player profile
router.patch('/profile', verifyToken, isPlayer, updateProfile);

// Delete player account
router.delete('/delete', verifyToken, isPlayer, deleteAccount);

module.exports = router;
