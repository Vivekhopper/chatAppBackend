const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  avatar: { type: String },
  timeStamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('chatApp', chatSchema);

module.exports = Chat;
