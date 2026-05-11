const mongoose =
require("mongoose");

const savedJobSchema =
new mongoose.Schema({

  userEmail: {
    type: String,
  },

  jobId: {
    type: String,
  },

  title: {
    type: String,
  },

  company: {
    type: String,
  },

  location: {
    type: String,
  },

  salary: {
    type: String,
  },

});

module.exports =
mongoose.model(
  "SavedJob",
  savedJobSchema
);