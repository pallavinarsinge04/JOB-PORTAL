const express =
require("express");

const router =
express.Router();

const Application =
require("../models/Application");

const upload =
require("../middleware/upload");


// ==============================
// Apply Job + Resume Upload
// ==============================

router.post(
  "/apply",
  upload.single("resume"),

  async (req, res) => {

    try {

      const newApplication =
      new Application({

        userEmail:
        req.body.userEmail,

        jobId:
        req.body.jobId,

        jobTitle:
        req.body.jobTitle,

        company:
        req.body.company,

        resume:
        req.file
        ? req.file.filename
        : "",
      });

      await newApplication.save();

      res.json({
        message:
        "Applied Successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Application Failed",
      });
    }
  }
);


// ==============================
// Get All Applications
// ==============================

router.get(
  "/all",

  async (req, res) => {

    try {

      const applications =
      await Application.find();

      res.json(applications);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Fetch Applications",
      });
    }
  }
);


// ==============================
// Delete Application
// ==============================

router.delete(
  "/delete/:id",

  async (req, res) => {

    try {

      await Application.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
        "Application Deleted Successfully",
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