var express = require("express");
var router = express.Router();
const pool = require("../db");

// Get Users Information for Profile Page
router.get("/", async (req, res) => {
  console.log("test")
  try {
    let response = await pool.query("SELECT name, username, image FROM users JOIN countries  ON users.country_id = countries.id WHERE id = 1;");
    let usersData = response.rows;
    res.send(usersData);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
// JOIN countries  ON users.country_id = countries.id WHERE user_id = 1