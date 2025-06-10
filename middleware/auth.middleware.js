const jwtUtils = require('../utils/jwt.utils');
const userModel = require('../models/user.model');

async function authMiddleware(req, res, next) {
  const token = jwtUtils.getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  const decoded = jwtUtils.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }

  // Optionally, fetch user and attach to req
  const user = await userModel.findUserById(decoded.id);
  if (!user) {
    return res.status(401).json({ error: 'User not found.' });
  }

  req.user = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  next();
}

module.exports = authMiddleware;