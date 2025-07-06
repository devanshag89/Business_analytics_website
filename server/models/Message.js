const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("Messages",messageSchema);

module.exports = Message;