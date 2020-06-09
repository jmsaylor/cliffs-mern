const express = require("express");
const router = express.Router();

// @route		POST api/users
// @desc		create new user
// @access	public
router.post("/", (req, res) => {
  res.json({ body: req.body });
});

// validate the body
// must have email and password
// email must be valid email
// password must have at least 6 characters.

module.exports = router;
