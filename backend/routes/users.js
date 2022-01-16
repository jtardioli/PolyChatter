var express = require("express");
var router = express.Router();
const pool = require("../db");

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    let response = await pool.query("SELECT * FROM users;");
    let usersData = response.rows;
    res.send(usersData);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
