const sessionModel = require('../models/session.model');

exports.createSession = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user?.id || null;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const session = await sessionModel.createSession({
      user: userId,
      title: title || 'New Chat',
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create session.' });
  }
};

exports.getSessionsByUser = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const sessions = await sessionModel.getSessionsByUser(userId);
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get sessions.' });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await sessionModel.findSessionById(id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found.' });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get session.' });
  }
};

exports.deleteSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    await sessionModel.deleteSessionById(id);
    res.json({ message: 'Session deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete session.' });
  }
};

