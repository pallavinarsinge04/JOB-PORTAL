const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// Register
router.post(
  "/register",
  async (req, res) => {
    try {

      const existingUser =
      await User.findOne({
        email: req.body.email,
      });

      if (existingUser) {
        return res
          .status(400)
          .json("User already exists");
      }

      const hashedPassword =
      await bcrypt.hash(
        req.body.password,
        10
      );

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });

      await user.save();

      res.json({
        message:
        "Registration Successful",
      });

    } catch (err) {
      res.status(500).json(err);
    }
  }
);


// Login
router.post(
  "/login",
  async (req, res) => {
    try {

      const user =
      await User.findOne({
        email: req.body.email,
      });

      if (!user) {
        return res
          .status(400)
          .json("User not found");
      }

      const validPassword =
      await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res
          .status(400)
          .json("Invalid Password");
      }

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        token,
        user,
      });

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;