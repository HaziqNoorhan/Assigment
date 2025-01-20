const { addSpectator, getGameWithSpectators, getSpectatableGames } = require('../models/gameModel');

// Join a game as a spectator
const spectateGame = async (req, res) => {
  const { id: gameId } = req.params;
  const userId = req.user.userId;

  try {
    const game = await getGameWithSpectators(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    await addSpectator(gameId, userId);
    res.json({
      message: 'You are now spectating this game.',
      gameId,
    });
  } catch (error) {
    console.error('Error adding spectator:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// List all games available for spectating
const listSpectatableGames = async (req, res) => {
  try {
    const games = await getSpectatableGames();
    res.json(games);
  } catch (error) {
    console.error('Error fetching spectatable games:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { spectateGame, listSpectatableGames };
