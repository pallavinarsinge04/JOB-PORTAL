const express =
require("express");

const router =
express.Router();

const Job =
require("../models/Job");


// ==========================
// Get All Jobs
// ==========================
router.get(
  "/all",

  async (req, res) => {

    try {

      const jobs =
      await Job.find();

      res.json(jobs);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to fetch jobs",
      });
    }
  }
);


// ==========================
// Add Job
// ==========================
router.post(
  "/add",

  async (req, res) => {

    try {

      const newJob =
      new Job(req.body);

      await newJob.save();

      res.json({
        message:
        "Job Added Successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Add Job",
      });
    }
  }
);


// ==========================
// Delete Job
// ==========================
router.delete(
  "/delete/:id",

  async (req, res) => {

    try {

      await Job.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
        "Job Deleted",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Delete Job",
      });
    }
  }
);


// ==========================
// Update Job
// ==========================
router.put(
  "/update/:id",

  async (req, res) => {

    try {

      const updatedJob =
      await Job.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }
      );

      res.json(updatedJob);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Update Job",
      });
    }
  }
);

module.exports = router;