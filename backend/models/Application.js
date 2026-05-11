const mongoose =
require("mongoose");

const applicationSchema =
new mongoose.Schema({

  userEmail: {
    type: String,
  },

  jobId: {
    type: String,
  },

  jobTitle: {
    type: String,
  },

  company: {
    type: String,
  },

  resume: {
    type: String,
  },

});

module.exports =
mongoose.model(
  "Application",
  applicationSchema
);