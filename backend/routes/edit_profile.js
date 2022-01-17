const express = require("express");
const router = express.Router();
const pool = require("../db");
const { userAuth } = require("../middlewares/auth-middleware");
const cloudinary = require('cloudinary')
const { hash } = require("bcryptjs");
//const { cloudinaryConfig, uploader } = require('../config/cloudinaryConfig')


// Get Users Information for Profile Page
//userAuth
router.post("/profile/edit", userAuth, async (req, res) => {
  // console.log(req.body)
   console.log(req.files)
  // console.log(req.user)

 try {
  let imageURL = "";
  if ("files" in req) {
    await cloudinary.v2.uploader.upload(req.files.file.tempFilePath,
    { public_id: req.files.file.name }, 
    function(error, result) {
      if(error){
        console.log(error)
      }
      imageURL = result; 
    });
    let response = await pool.query("UPDATE users SET image = $1 WHERE id = $2 RETURNING image;", [imageURL, req.user.id]);
    let usersData = response.rows;
    console.log(usersData)
    res.json(usersData);
  }
  
    let response = await pool.query("UPDATE users SET username = $1, name = $2, bio = $3 WHERE id = $4 RETURNING username, name, bio;", [req.body.username, req.body.name, req.body.bio, req.user.id]);
    let usersData = response.rows;
    console.log(usersData)
    res.json(usersData);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
