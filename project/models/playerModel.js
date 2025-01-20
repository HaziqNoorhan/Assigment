const { getDB } = require('../utils/db');
const { ObjectId } = require('mongodb');

// Fetch a player by ID
const getPlayerById = async (id) => {
  const db = getDB();
  return db.collection('players').findOne({ _id: new ObjectId(id) });
};

// Fetch all players
const getAllPlayers = async () => {
  const db = getDB();
  return db.collection('players').find().toArray();
};

// Update player details
const updatePlayer = async (id, updates) => {
  const db = getDB();
  return db.collection('players').updateOne({ _id: new ObjectId(id) }, { $set: updates });
};

// Delete player
const deletePlayer = async (id) => {
  const db = getDB();
  return db.collection('players').deleteOne({ _id: new ObjectId(id) });
};

module.exports = { getPlayerById, getAllPlayers, updatePlayer, deletePlayer };
