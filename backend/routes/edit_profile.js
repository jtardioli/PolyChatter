const express = require("express");
const router = express.Router();
const pool = require("../db");
const { validateJWTTokenMiddleware } = require("../middlewares/auth-middleware");
const cloudinary = require('cloudinary')


// Save Users Information from Edit Profile Page
router.post("/profile/edit", validateJWTTokenMiddleware, async (req, res) => {
  
  console.log("Edit profile")
   console.log(req.body)

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
      imageURL = result.url; 
    });

    // only if image is uploaded, save the url to the db
    let image = await pool.query(`
    UPDATE users 
    SET image = $1 
    WHERE id = $2 
    RETURNING image;`, [imageURL, req.user.id]);
    let imageData = image.rows;
    console.log(imageData)
    userInformation.imageData = imageData;
  }
    // Get Country id based on it's name
    let countryId = await pool.query(`
    SELECT id FROM countries
    WHERE countryName = $1;`, [req.body.country]);
    let countryIdData = countryId.rows[0].id;
    console.log(countryIdData)

    // Update Country id in Users table
    let country = await pool.query(`
    UPDATE users
    SET country_id = $1
    WHERE users.id = $2
    RETURNING *;`, [countryIdData, req.user.id]);
    let countryData = country.rows;
    console.log("countryData")
    console.log(countryData)
    userInformation.countryData = countryData;

    //save user info(usename, name, bio) to the db
    let userInfo = await pool.query(`
    UPDATE users 
    SET username = $1, 
    name = $2, 
    bio = $3 
    WHERE id = $4 
    RETURNING username, name, bio;`, [req.body.username, req.body.name, req.body.bio, req.user.id]);
    let userData = userInfo.rows;
    console.log(userData)
    userInformation.userData = userData;


    // // Select Language id based on language longForm
    // let nativeLanguageId = await pool.query(`
    // SELECT id FROM Languages
    // WHERE longForm = $1;`, [req.body.nativeLanguage]);
    // let nativeLanguageIdData = nativeLanguageId.rows[0].id;
    // console.log("nativeLanguageIdData")
    // console.log(nativeLanguageIdData)

    // let insertLanguages = await pool.query(`
    // SELECT id FROM Languages
    // WHERE longForm = $1;`, [req.body.nativeLanguage]);
    // let nativeLanguageIdData = nativeLanguageId.rows[0].id;
    // console.log("nativeLanguageIdData")
    // console.log(nativeLanguageIdData)

    // // Update db with Native Language Info
    // let language = await pool.query(`
    // UPDATE userLanguages
    // SET language_id = $1,
    // nativeLanguage = true
    // WHERE
    // user_id = $2
    // RETURNING *;`, [nativeLanguageIdData, req.user.id]);
    // console.log("language.rows")
    // console.log(language.rows)
    // let languageData = language.rows;
    // console.log("languageData")
    // console.log(languageData)
    // userInformation.languageData = languageData;

    res.json(userInformation);

  } catch (err) {
    console.log(err);
  }
});

// GET request for Edit Profile Page
router.get("/profile/edit", validateJWTTokenMiddleware, async (req, res) => {
  console.log("Edit profile GET")
  console.log(req.body)

 try {
  let userInformation = {};
  
    let userInfo = await pool.query(`
    SELECT users.id,
    users.username,
    users.name,
    users.image,
    users.email,
    users.bio,
    countries.countryname
    FROM users
    JOIN countries on countries.id = users.country_id
    WHERE users.id = $1
    ;`, [ req.user.id]);
    let userData = userInfo.rows;
    console.log(userData)
    userInformation.userData = userData;

    // Select Id of a Language by name
    let userLangInfo = await pool.query(`
    SELECT longForm
    FROM Languages
    JOIN userLanguages on userLanguages.language_id = Languages.id
    WHERE userLanguages.user_id = $1
    ;`, [ req.user.id]);
    let userLangData = userLangInfo.rows;
    console.log(userLangData)
    userInformation.userLangData = userLangData;

    res.json(userInformation);

  } catch (err) {
    console.log(err);
  }
});

// 'http://res.cloudinary.com/dtx8hllui/image/upload/v1642478965/logo_user.jpeg.jpg' default image for every user
module.exports = router;
