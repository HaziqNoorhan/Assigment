const { getPlayerById, getAllPlayers, updatePlayer, deletePlayer } = require('../routes/models/playerModel');
const { hashPassword } = require('../utils/passwordUtils');

// Get Player Profile
const getProfile = async (req, res) => {
  try {
    const player = await getPlayerById(req.user.userId);
    if (!player) return res.status(404).send('Player not found');
    res.send(player);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

// Update Player Profile
const updateProfile = async (req, res) => {
  const { username, password } = req.body;
  try {
    const updates = {};
    if (username) updates.username = username;
    if (password) updates.password = await hashPassword(password);

    const result = await updatePlayer(req.user.userId, updates);
    if (!result.matchedCount) return res.status(404).send('Player not found');

    res.send({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

// Delete Player Account
const deleteAccount = async (req, res) => {
  try {
    const result = await deletePlayer(req.user.userId);
    if (!result.deletedCount) return res.status(404).send('Player not found');
    res.send({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

// Admin: List All Players
const listAllPlayers = async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.send(players);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

// Admin: Get Player Details
const getPlayerDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await getPlayerById(id);
    if (!player) return res.status(404).send('Player not found');
    res.send(player);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = { getProfile, updateProfile, deleteAccount, listAllPlayers, getPlayerDetails };
