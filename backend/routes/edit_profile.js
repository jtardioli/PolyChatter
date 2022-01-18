const express = require("express");
const router = express.Router();
const pool = require("../db");
const { validateJWTTokenMiddleware } = require("../middlewares/auth-middleware");
const cloudinary = require('cloudinary')
const { hash } = require("bcryptjs");
//const { cloudinaryConfig, uploader } = require('../config/cloudinaryConfig')


// Get Users Information for Profile Page
//userAuth
router.post("/profile/edit", validateJWTTokenMiddleware, async (req, res) => {
  // console.log(req.body)
  console.log("Edit profile")
   console.log(req.body)
  // console.log(req.user)

 try {
  let imageURL = "";
  let userInformation = {};
  if (req.files != null) {
    await cloudinary.v2.uploader.upload(req.files.file.tempFilePath,
    { public_id: req.files.file.name }, 
    function(error, result) {
      if(error){
        console.log(error)
      }
      imageURL = result; 
    });
    // only if image is uploaded, save the url to the db
    let image = await pool.query("UPDATE users SET image = $1 WHERE id = $2 RETURNING image;", [imageURL, req.user.id]);
    let imageData = image.rows;
    console.log(imageData)
    userInformation.imageData = imageData;
  }
    // let country = await pool.query("UPDATE countries SET countryName = $1 WHERE users.country_id = $2 RETURNING countryName;", [req.body.country, req.user.id]);
    // let countryData = country.rows;
    // console.log(countryData)
    // res.json(countryData);

    //save user info(usename, name, bio) to the db
    let userInfo = await pool.query("UPDATE users SET username = $1, name = $2, bio = $3 WHERE id = $4 RETURNING username, name, bio;", [req.body.username, req.body.name, req.body.bio, req.user.id]);
    let userData = userInfo.rows;
    console.log(userData)
    userInformation.userData = userData;
    res.json(userInformation);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
