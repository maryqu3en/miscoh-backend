const userModel = require('../models/user.model');
const jwtUtils = require('../utils/jwt.utils');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: 'All fields are required.' });

    const existing = await userModel.findUserByEmail(email);
    if (existing)
      return res.status(409).json({ error: 'Email already in use.' });

    const existingUsername = await userModel.findUserByUsername(username);
    if (existingUsername)
      return res.status(409).json({ error: 'Username already in use.' });

    const user = await userModel.createUser({ username, email, password });
    const token = await jwtUtils.generateToken(user);

    res.status(201).json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed.', details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required.' });

    const user = await userModel.findUserByEmail(email);
    if (!user)
      return res.status(401).json({ error: 'Invalid credentials.' });

    const valid = await user.comparePassword(password);
    if (!valid)
      return res.status(401).json({ error: 'Invalid credentials.' });

    const token = await jwtUtils.generateToken(user);

    res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed.' });
  }
};

exports.me = async (req, res) => {
  try {
    const token = jwtUtils.getTokenFromHeader(req);
    if (!token) return res.status(401).json({ error: 'No token provided.' });

    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token.' });

    const user = await userModel.findUserById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user.' });
  }
};