const express = require('express');
const { spectateGame, listSpectatableGames } = require('../controllers/spectatorController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /spectator/spectate/{id}:
 *   get:
 *     summary: Spectate a specific game
 *     description: Allows a user to join a game as a spectator.
 *     tags:
 *       - Spectator
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the game.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully joined the game as a spectator.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are now spectating this game.
 *                 gameId:
 *                   type: string
 *                   example: gameId123
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/spectate/:id', verifyToken, spectateGame);

/**
 * @swagger
 * /spectator/spectate/list:
 *   get:
 *     summary: List all games available for spectating
 *     description: Retrieve a list of games that are currently active and available for spectators.
 *     tags:
 *       - Spectator
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of spectatable games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique ID of the game.
 *                   player1:
 *                     type: string
 *                     description: ID of Player 1.
 *                   player2:
 *                     type: string
 *                     description: ID of Player 2.
 *                   spectators:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of spectator IDs.
 *                   isGameOver:
 *                     type: boolean
 *                     description: Whether the game is over.
 *       500:
 *         description: Internal server error.
 */
router.get('/spectate/list', verifyToken, listSpectatableGames);

module.exports = router;
