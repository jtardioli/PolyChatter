var express = require("express");
var router = express.Router();
const pool = require("../db");
const { userAuth } = require("../middlewares/auth-middleware");
var cloudinary = require('cloudinary').v2

//Cloudinary config

// Get Users Information for Profile Page
router.post("/profile/edit", userAuth, async (req, res) => {
  console.log(req.body)
  try {
    cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
    // let response = await pool.query("INSERT INTO users (username, name, image, password, bio) VALUES ($1, $2, $3, $4, $5, $6) WHERE id = $7;", [req.user.username, req.user.name, req.user.image, req.user.password, req.user.bio, req.user.id]);
    // let usersData = response.rows;
    // res.send(usersData);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
