const express =
require("express");

const router =
express.Router();

const SavedJob =
require("../models/SavedJob");


// ==========================
// Save Job
// ==========================

router.post(
  "/save",

  async (req, res) => {

    try {

      const existingJob =
      await SavedJob.findOne({

        userEmail:
        req.body.userEmail,

        jobId:
        req.body.jobId,
      });

      if (existingJob) {

        return res.json({
          message:
          "Job Already Saved",
        });
      }

      const newSavedJob =
      new SavedJob(req.body);

      await newSavedJob.save();

      res.json({
        message:
        "Job Saved Successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Save Failed",
      });
    }
  }
);


// ==========================
// Get Saved Jobs
// ==========================

router.get(
  "/:email",

  async (req, res) => {

    try {

      const jobs =
      await SavedJob.find({

        userEmail:
        req.params.email,
      });

      res.json(jobs);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Fetch Jobs",
      });
    }
  }
);


// ==========================
// Delete Saved Job
// ==========================

router.delete(
  "/delete/:id",

  async (req, res) => {

    try {

      await SavedJob.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
        "Saved Job Removed",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Delete Failed",
      });
    }
  }
);

module.exports = router;