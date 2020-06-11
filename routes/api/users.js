const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const isEmpty = require("../../utils/isEmpty");

const User = require("../../models/User");

// @route		POST api/users
// @desc		create new user
// @access	public
router.post(
  "/",
  [
    check("email", "Email Required").not().isEmpty(),
    check("email", "Valid Email Required").isEmail(),
    check("password", "Password must contain at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userData = {
        email: req.body.email,
        password: req.body.password,
      };

      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      const user = await User.create(userData);
      const keys = Object.keys(user._doc);
      console.log(keys);
      console.log(user);
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
);

// @route		PUT api/users
// @desc		login route
// @access	public
router.put(
  "/",
  [
    check("email", "Email Required").not().isEmpty(),
    check("email", "Valid Email Required").isEmail(),
    check("password", "Password Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (isEmpty(user)) {
        return res.status(404).json({ errors: { message: "user not found" } });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res
          .status(403)
          .json({ errors: { message: "invalid password" } });
      }

      //create the jwt token and return it to user. email and the id
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
);

module.exports = router;
