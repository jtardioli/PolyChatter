var express = require("express");
var router = express.Router();
const pool = require("../db");
const { validateJWTTokenMiddleware } = require("../middlewares/auth-middleware");

// Get Users Information for Profile Page
router.get("/profile", validateJWTTokenMiddleware, async (req, res) => {
  try {
    let userInfo = await pool.query("SELECT users.name, users.username, users.image, users.bio FROM users WHERE id = $1;", [req.user.id]);
    let userInfoData = userInfo.rows;

    let userCountry = await pool.query("SELECT countries.countryName FROM countries JOIN users ON users.country_id = countries.id WHERE users.id = $1;", [req.user.id]);
    let userCountryData = userCountry.rows;
    res.send(userInfoData, userCountryData);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;