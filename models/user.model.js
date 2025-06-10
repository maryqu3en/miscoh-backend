const User = require('../schemas/User');

async function createUser(data) {
  const user = new User(data);
  return await user.save();
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function findUserByUsername(username) {
  return await User.findOne({ username });
}

async function findUserById(id) {
  return await User.findById(id);
}

async function deleteUserById(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  deleteUserById,
};