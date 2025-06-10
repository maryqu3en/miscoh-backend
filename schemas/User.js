const mongoose = require('mongoose');
const bcrypt = require('../utils/bcrypt.utils');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
}, { versionKey: false });

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    user.password = await bcrypt.hashPassword(user.password);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.comparePassword(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);