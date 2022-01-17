var express = require("express");
var router = express.Router();
const pool = require("../db");
const { userAuth } = require("../middlewares/auth-middleware");

// Get Users Information for Profile Page
router.get("/profile", userAuth, async (req, res) => {
  try {
    let response = await pool.query("SELECT name, username, image, bio FROM users WHERE id = $1;", [req.user.id]);
    let userData = response.rows;
    res.send(userData);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
// JOIN countries  ON users.country_id = countries.id WHERE user_id = 1