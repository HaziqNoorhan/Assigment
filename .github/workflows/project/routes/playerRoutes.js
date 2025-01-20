const express = require('express');
const { getProfile, updateProfile, deleteAccount } = require('../controllers/playerController');
const { verifyToken, isPlayer } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /player/profile:
 *   get:
 *     summary: Get the profile of the authenticated player
 *     description: Fetches the details of the authenticated player's profile.
 *     tags:
 *       - Player
 *     responses:
 *       200:
 *         description: Player profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       403:
 *         description: Forbidden, not a player
 */
router.get('/profile', verifyToken, isPlayer, getProfile);

/**
 * @swagger
 * /player/profile:
 *   patch:
 *     summary: Update the profile of the authenticated player
 *     description: Allows a player to update their own profile information.
 *     tags:
 *       - Player
 *     responses:
 *       200:
 *         description: Updated profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request, invalid data
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       403:
 *         description: Forbidden, not a player
 */
router.patch('/profile', verifyToken, isPlayer, updateProfile);

/**
 * @swagger
 * /player/delete:
 *   delete:
 *     summary: Delete the player's account
 *     description: Allows a player to delete their account permanently.
 *     tags:
 *       - Player
 *     responses:
 *       200:
 *         description: Player account deleted successfully
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       403:
 *         description: Forbidden, not a player
 */
router.delete('/delete', verifyToken, isPlayer, deleteAccount);

module.exports = router;
