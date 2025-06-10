const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:     { type: String, default: 'New Chat' },
  created_at:{ type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model('Session', SessionSchema);