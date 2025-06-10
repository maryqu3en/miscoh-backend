const chatModel = require('../models/chat.model');
const sessionModel = require('../models/session.model');

exports.addMessage = async (req, res) => {
  try {
    const { message, role, session } = req.body;
    if (!message || !role || !session) {
      return res.status(400).json({ error: 'Message, role, and session are required.' });
    }
    const userId = req.user?.id || null;
    const chat = await chatModel.addMessage({
      message,
      role,
      session,
      user: userId,
    });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add message.' });
  }
};

exports.getMessagesBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = await chatModel.getMessagesBySession(sessionId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get messages.' });
  }
};

exports.deleteMessagesBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    await chatModel.deleteMessagesBySession(sessionId);
    res.json({ message: 'Messages deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete messages.' });
  }
};

exports.deleteMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    await chatModel.deleteMessageById(id);
    res.json({ message: 'Message deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message.' });
  }
};