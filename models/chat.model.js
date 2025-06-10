const Chat = require('../schemas/Chat');

async function addMessage(data) {
  const chat = new Chat(data);
  return await chat.save();
}

async function getMessagesBySession(sessionId) {
  return await Chat.find({ session: sessionId }).sort({ timestamp: 1 });
}

async function deleteMessagesBySession(sessionId) {
  return await Chat.deleteMany({ session: sessionId });
}

async function deleteMessageById(id) {
  return await Chat.findByIdAndDelete(id);
}

module.exports = {
  addMessage,
  getMessagesBySession,
  deleteMessagesBySession,
  deleteMessageById,
};