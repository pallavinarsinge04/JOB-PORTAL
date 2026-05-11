const mongoose =
require("mongoose");

const chatSchema =
new mongoose.Schema({

  senderEmail: {
    type: String,
  },

  receiverEmail: {
    type: String,
  },

  message: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports =
mongoose.model(
  "Chat",
  chatSchema
);