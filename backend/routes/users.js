var express = require("express");
var router = express.Router();
const pool = require("../db");

/* GET all users info */
router.get("/users", async (req, res) => {
  try {
    // query for all userLanguage enteries
    let usersLangData = await pool.query(`
    SELECT userLanguages.user_id as userID,
    userLanguages.nativeLanguage,
     languages.shortform,
     languages.longform 
     FROM userLanguages
    JOIN languages ON  languages.id = userLanguages.language_id 
    ;
    `);
    // query for all users with their countries
    let usersData = await pool.query(`
    SELECT users.id,
    users.username,
    users.name,
    users.image,
    users.email,
    users.bio,
    countries.countryname,
    countries.countryshortname,
    countries.emoji
    FROM users
    JOIN countries on countries.id = users.country_id
    ;
    `);

    // Extract data from the gross big request object
    usersLangData = usersLangData.rows;
    usersData = usersData.rows;
    let users = {};

    // transform usersData array into an object to be able to grab users by their ID
    for (userData of usersData) {
      users[userData.id] = userData;
    }

    // loop through the userlang enteries using the userID to insert language data into the user object directly
    for (userLangData of usersLangData) {
      const userID = userLangData.userid;
      if (userLangData.nativelanguage) {
        users[userID].nativeLanguage = userLangData;
      } else {
        users[userID].targetLanguage = userLangData;
      }
    }

    // transform the object back into an array of objects so its easier to work with in react
    users = Object.keys(users).map((k) => users[k]);

    // Send users array to front end
    res.send(users);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
