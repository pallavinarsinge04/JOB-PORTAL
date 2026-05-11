const express =
require("express");

const router =
express.Router();

const Chat =
require("../models/Chat");


// ==========================
// Send Message
// ==========================

router.post(
  "/send",

  async (req, res) => {

    try {

      const newMessage =
      new Chat({

        senderEmail:
        req.body.senderEmail,

        receiverEmail:
        req.body.receiverEmail,

        message:
        req.body.message,
      });

      await newMessage.save();

      res.json({
        message:
        "Message Sent",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Send Message",
      });
    }
  }
);


// ==========================
// Get Chat Messages
// ==========================

router.get(
  "/:sender/:receiver",

  async (req, res) => {

    try {

      const chats =
      await Chat.find({

        $or: [

          {
            senderEmail:
            req.params.sender,

            receiverEmail:
            req.params.receiver,
          },

          {
            senderEmail:
            req.params.receiver,

            receiverEmail:
            req.params.sender,
          },
        ],
      }).sort({
        createdAt: 1,
      });

      res.json(chats);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
        "Failed to Fetch Chats",
      });
    }
  }
);

module.exports = router;