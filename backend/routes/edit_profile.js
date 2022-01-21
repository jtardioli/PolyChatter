const express = require("express");
const router = express.Router();
const pool = require("../db");
const { validateJWTTokenMiddleware } = require("../middlewares/auth-middleware");
const cloudinary = require('cloudinary')


// Save Users Information entered from Edit Profile Page
router.post("/profile/edit", validateJWTTokenMiddleware, async (req, res) => {
  
  console.log("Edit profile POST")
  //  console.log(req.body)

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

    // Only if image is uploaded, save the url to the db
    let image = await pool.query(`
    UPDATE users 
    SET image = $1 
    WHERE id = $2 
    RETURNING image;`, [imageURL, req.user.id]);
    let imageData = image.rows;
    //console.log(imageData)
    userInformation.imageData = imageData;
  }


    //Save user info(usename, name, bio) to the db
    let userInfo = await pool.query(`
    UPDATE users 
    SET username = $1, 
    name = $2, 
    bio = $3 
    WHERE id = $4 
    RETURNING username, name, bio;`, [req.body.username, req.body.name, req.body.bio, req.user.id]);
    let userData = userInfo.rows;
    // console.log(userData)
    userInformation.userData = userData;


    //Get Country id based on it's name
    let countryId = await pool.query(`
    SELECT countries.id FROM countries
    WHERE countries.countryName = $1;`, [req.body.country]);
    // console.log("countryId==========")
    // console.log(countryId)
    let countryIdData = countryId.rows[0].id;

    // Update Country id in Users table
    let country = await pool.query(`
    UPDATE users
    SET country_id = $1
    WHERE users.id = $2
    RETURNING *;`, [countryIdData, req.user.id]);
    let countryData = country.rows;
    // console.log("countryData")
    // console.log(countryData)
    userInformation.userData[0].countryData = countryData;

    // Select Native Language id based on language name (longForm)
    let nativeLanguageId = await pool.query(`
    SELECT id FROM Languages
    WHERE longForm = $1;`, [req.body.nativeLanguage]);
    let nativeLanguageIdData = nativeLanguageId.rows[0].id;
    // console.log("nativeLanguageId=============")
    // console.log(nativeLanguageId)

    //Insert Native Language details into userLanguages bridge table 
    let insertNativeLanguage = await pool.query(`
    UPDATE userLanguages
    SET language_id = $1
    WHERE user_id =$2 AND nativeLanguage = true
    RETURNING *;`, [nativeLanguageIdData, req.user.id ]);
    console.log("insertNativeLanguage")
    console.log(insertNativeLanguage)
    let nativeLanguageData = insertNativeLanguage.rows[0];
    console.log("nativeLanguageData")
    console.log(nativeLanguageData)
    userInformation.nativeLanguageData = nativeLanguageData;

    // Select Target Language id based on language longForm
    let targetLanguageId = await pool.query(`
    SELECT id FROM Languages
    WHERE longForm = $1;`, [req.body.targetLanguage]);
    let targetLanguageIdData = targetLanguageId.rows[0].id;
    // console.log("targetLanguageIdData")
    // console.log(targetLanguageIdData)

    //Insert target language details into userLanguages bridge table 
    let insertTargetLanguage = await pool.query(`
    UPDATE userLanguages
    SET language_id = $1
    WHERE user_id =$2 AND nativeLanguage = false
    RETURNING *;`, [nativeLanguageIdData, req.user.id ]);
    // console.log("insertTargetLanguage")
    // console.log(insertTargetLanguage)
    let targetLanguageData = insertTargetLanguage.rows[0];
    // console.log("targetLanguageData")
    // console.log(targetLanguageData)
    userInformation.targetLanguageData = targetLanguageData;
      // console.log(userInformation)

    res.json(userInformation);

  } catch (err) {
    console.log(err);
  }
});

// GET request for Edit Profile Page
router.get("/profile/edit", validateJWTTokenMiddleware, async (req, res) => {
  console.log("Edit profile GET")
  // console.log(req.user)

 try {
  let userInformation = {};

    //Display users info (username, name, image, email, bio, country)
    let userInfo = await pool.query(`
    SELECT users.id,
    users.username,
    users.name,
    users.image,
    users.email,
    users.bio
    FROM users
    WHERE users.id = $1
    ;`, [ req.user.id]);
    let userData = userInfo.rows;
    // console.log(userData)
    userInformation.userData = userData;

    //Display country name
    let countryInfo = await pool.query(`
    SELECT countryName
    FROM countries
    JOIN users ON users.country_id = countries.id
    WHERE users.id = $1
    ;`, [req.user.id]);
    let countryData = countryInfo.rows[0].countryname;
    // console.log("countryData")
    // console.log(countryData)
    userInformation.userData[0].countryData = countryData;

    // Display native language
    let nativeUserLangInfo = await pool.query(`
    SELECT longForm
    FROM Languages
    JOIN userLanguages on userLanguages.language_id = Languages.id
    WHERE userLanguages.user_id = $1 AND nativeLanguage = $2
    ;`, [ req.user.id, true]);
    // console.log("nativeUserLangInfo")
    // console.log(nativeUserLangInfo)
    let nativeLanguage = nativeUserLangInfo.rows[0].longform;
    // console.log(userLangData)
    userInformation.userData[0].nativeLanguage = nativeLanguage;

    // Display target language
    let targetUserLangInfo = await pool.query(`
    SELECT longForm
    FROM Languages
    JOIN userLanguages on userLanguages.language_id = Languages.id
    WHERE userLanguages.user_id = $1 AND nativeLanguage = $2
    ;`, [ req.user.id, false]);
    // console.log("targetUserLangInfo")
    // console.log(targetUserLangInfo)
    let targetLanguage = targetUserLangInfo.rows[0].longform;
    // console.log(userLangData)
    userInformation.userData[0].targetLanguage = targetLanguage;



    res.json(userInformation);

  } catch (err) {
    console.log(err);
  }
});

// 'http://res.cloudinary.com/dtx8hllui/image/upload/v1642478965/logo_user.jpeg.jpg' default image for every user
module.exports = router;
