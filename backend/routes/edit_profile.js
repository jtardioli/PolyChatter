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

    //NATIVE LABGUAGE
    // Select Language id based on language name (longForm)
    let nativeLanguageId = await pool.query(`
    SELECT id FROM Languages
    WHERE longForm = $1;`, [req.body.nativeLanguage]);
    let nativeLanguageIdData = nativeLanguageId.rows[0].id;
    console.log("nativeLanguageIdData")
    console.log(nativeLanguageIdData)

    //insert native language details into userLanguages bridge table 
    let insertNativeLanguage = await pool.query(`
    INSERT INTO userLanguages (
      user_id,
      language_id,
      nativeLanguage
    )
    VALUES (
      $1,
      $2,
      true
    ) 
    RETURNING *;`, [req.user.id, nativeLanguageIdData]);
    console.log("insertNativeLanguage")
    console.log(insertNativeLanguage)
    let nativeLanguageData = insertNativeLanguage.rows[0];
    console.log("nativeLanguageData")
    console.log(nativeLanguageData)
    userInformation.nativeLanguageData = nativeLanguageData;

    //TARGET LANGUAGE
    // Select Language id based on language longForm
    let targetLanguageId = await pool.query(`
    SELECT id FROM Languages
    WHERE longForm = $1;`, [req.body.targetLanguage]);
    let targetLanguageIdData = targetLanguageId.rows[0].id;
    console.log("targetLanguageIdData")
    console.log(targetLanguageIdData)

    //insert target language details into userLanguages bridge table 
    let insertTargetLanguage = await pool.query(`
    INSERT INTO userLanguages (
      user_id,
      language_id,
      nativeLanguage
    )
    VALUES (
      $1,
      $2,
      false
    ) 
    RETURNING *;`, [req.user.id, targetLanguageIdData]);
    console.log("insertTargetLanguage")
    console.log(insertTargetLanguage)
    let targetLanguageData = insertTargetLanguage.rows[0];
    console.log("targetLanguageData")
    console.log(targetLanguageData)
    userInformation.targetLanguageData = targetLanguageData;

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

    //display users info (username, name, image, email, bio, country)
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

    //NATIVE LANGUAGE
    // display name of a Language
    let nativeUserLangInfo = await pool.query(`
    SELECT longForm
    FROM Languages
    JOIN userLanguages on userLanguages.language_id = Languages.id
    WHERE userLanguages.user_id = $1 AND nativeLanguage = $2 LIMIT 1
    ;`, [ req.user.id, true]);
    let nativeLanguage = nativeUserLangInfo.rows[0].longform;
    console.log("nativeUserLangInfo")
    console.log(nativeUserLangInfo)
    // console.log(userLangData)
    userInformation.userData[0].nativeLanguage = nativeLanguage;

    //TARGET LANGUAGE
    // display name of a Language
    let targetUserLangInfo = await pool.query(`
    SELECT longForm
    FROM Languages
    JOIN userLanguages on userLanguages.language_id = Languages.id
    WHERE userLanguages.user_id = $1 AND nativeLanguage = $2 LIMIT 1
    ;`, [ req.user.id, false]);
    console.log("targetUserLangInfo")
    console.log(targetUserLangInfo)
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
