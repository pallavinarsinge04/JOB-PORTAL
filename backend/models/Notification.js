const mongoose =
require("mongoose");

const notificationSchema =
new mongoose.Schema({

  userEmail: {
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
  "Notification",
  notificationSchema
);