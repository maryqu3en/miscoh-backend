const Session = require('../schemas/Session');

async function createSession(data) {
  const session = new Session(data);
  return await session.save();
}

async function getSessionsByUser(userId) {
  return await Session.find({ user: userId });
}

async function findSessionById(id) {
  return await Session.findById(id);
}

async function deleteSessionById(id) {
  return await Session.findByIdAndDelete(id);
}

module.exports = {
  createSession,
  getSessionsByUser,
  findSessionById,
  deleteSessionById,
};