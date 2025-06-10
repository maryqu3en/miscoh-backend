const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  session:   { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role:      { type: String, enum: ['user', 'assistant'], required: true },
  message:   { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model('Chat', ChatSchema);