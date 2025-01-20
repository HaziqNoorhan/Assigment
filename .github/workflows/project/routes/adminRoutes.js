const express = require('express');
const { listAllPlayers, getPlayerDetails } = require('../controllers/playerController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /admin/players:
 *   get:
 *     summary: Get a list of all players
 *     description: Allows an admin to fetch all players in the system.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: A list of all players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       403:
 *         description: Forbidden, user is not an admin
 *       401:
 *         description: Unauthorized, invalid or missing token
 */
router.get('/players', verifyToken, isAdmin, listAllPlayers);

/**
 * @swagger
 * /admin/player/{id}:
 *   get:
 *     summary: Get detailed information about a specific player
 *     description: Allows an admin to fetch details of a specific player by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the player to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the player
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
 *                 other_details:
 *                   type: string
 *       404:
 *         description: Player not found
 *       403:
 *         description: Forbidden, user is not an admin
 *       401:
 *         description: Unauthorized, invalid or missing token
 */
router.get('/player/:id', verifyToken, isAdmin, getPlayerDetails);

module.exports = router;
