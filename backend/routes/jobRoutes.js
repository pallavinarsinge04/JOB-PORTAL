const router = require("express").Router();
const Job = require("../models/Job");

router.post("/", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();

    res.json(savedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();

    res.json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;