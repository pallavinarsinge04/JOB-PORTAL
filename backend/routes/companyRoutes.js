const express =
require("express");

const router =
express.Router();

const Company =
require("../models/Company");


// ==========================
// Add Company
// ==========================
router.post(
  "/add",

  async (req, res) => {

    try {

      const newCompany =
      new Company(req.body);

      await newCompany.save();

      res.json({
        message:
        "Company Added",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Add Company",
      });
    }
  }
);


// ==========================
// Get All Companies
// ==========================
router.get(
  "/all",

  async (req, res) => {

    try {

      const companies =
      await Company.find();

      res.json(companies);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Fetch Companies",
      });
    }
  }
);


// ==========================
// Get Single Company
// ==========================
router.get(
  "/:id",

  async (req, res) => {

    try {

      const company =
      await Company.findById(
        req.params.id
      );

      res.json(company);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Fetch Company",
      });
    }
  }
);

module.exports = router;