const express =
require("express");

const router =
express.Router();

const Notification =
require("../models/Notification");


// ==========================
// Add Notification
// ==========================

router.post(
  "/add",

  async (req, res) => {

    try {

      const newNotification =
      new Notification({

        userEmail:
        req.body.userEmail,

        message:
        req.body.message,
      });

      await newNotification.save();

      res.json({
        message:
        "Notification Added",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Add Notification",
      });
    }
  }
);


// ==========================
// Get Notifications
// ==========================

router.get(
  "/:email",

  async (req, res) => {

    try {

      const notifications =
      await Notification.find({

        userEmail:
        req.params.email,
      }).sort({
        createdAt: -1,
      });

      res.json(notifications);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Fetch Notifications",
      });
    }
  }
);


// ==========================
// Delete Notification
// ==========================

router.delete(
  "/delete/:id",

  async (req, res) => {

    try {

      await Notification.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
        "Notification Deleted",
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