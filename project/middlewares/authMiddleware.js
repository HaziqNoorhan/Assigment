const jwt = require('jsonwebtoken');
const { getDB } = require('../utils/db');

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }

    // Check if the token is blacklisted
    const db = getDB();
    const blacklistedToken = await db.collection('blacklist').findOne({ token });
    if (blacklistedToken) {
      return res.status(403).json({ message: 'Invalid token. Token is blacklisted.' });
    }

    // Verify the token and attach the decoded payload to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(403).json({ message: 'Invalid token.' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};

// Middleware to check if the user is a player
const isPlayer = (req, res, next) => {
  if (req.user.role !== 'player') {
    return res.status(403).json({ message: 'Access denied. Player privileges required.' });
  }
  next();
};

// Middleware to check if the user is authorized to access their own data
const isAdminOrPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();

    // Check if the user is an admin
    if (req.user.role === 'admin') {
      return next();
    }

    // If not an admin, check if the player is accessing their own data
    const player = await db.collection('players').findOne({ _id: new ObjectId(id) });
    if (!player || req.user.userId !== player._id.toString()) {
      return res.status(403).json({ message: 'Access denied. Unauthorized access.' });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { verifyToken, isAdmin, isPlayer, isAdminOrPlayer };
