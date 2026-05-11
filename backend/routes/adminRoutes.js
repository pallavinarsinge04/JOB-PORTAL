const router = require("express").Router();

const User = require("../models/User");
const Job = require("../models/Job");
const Application =
require("../models/Application");

// Get Users
router.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

// Delete User
router.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json("User Deleted");
});

// Get Jobs
router.get("/jobs", async (req, res) => {
  const jobs = await Job.find();

  res.json(jobs);
});

// Delete Job
router.delete("/job/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);

  res.json("Job Deleted");
});

// Get Applications
router.get(
  "/applications",
  async (req, res) => {
    const applications =
    await Application.find();

    res.json(applications);
  }
);

module.exports = router;