const { hash } = require("bcryptjs");
const pool = require("../db");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  //console.log(req.body);
  const { username, name, email, password, countryName, targetLanguage, nativeLanguage } = req.body;

  try {
    const hashedPassword = await hash(password, 10);
    let userInformation = {};

    let userInfo = await pool.query(
      `INSERT INTO users (username, name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
      [username, name, email, hashedPassword]
    );
    //console.log(userInfo);
    userInformation.userInfo = userInfo.rows[0];
      
    //Get Country id based on it's name
    let countryId = await pool.query(`
    SELECT id FROM countries
    WHERE countryName = $1;`, [countryName]);
    // console.log("countryId.rows==========")
    // console.log(countryId)
    let countryIdData = countryId.rows[0].id;

    // Update Country id in Users table
    let country = await pool.query(`
    UPDATE users
    SET country_id = $1
    WHERE users.email = $2
    RETURNING *;`, [countryIdData, email]);
    let countryData = country.rows;
    userInformation.userInfo.country_id = countryData[0].country_id;

    // Display Native Language
    let nativeUserLangInfo = await pool.query(`
    SELECT id
    FROM Languages
    WHERE longForm = $1
    ;`, [nativeLanguage]);
    // console.log("nativeUserLangInfo=====================")
    // console.log(nativeLanguage)
    // console.log(nativeUserLangInfo)
    let nativeLanguageId = nativeUserLangInfo.rows[0].id//.longform;
    // userInformation.userData[0].nativeLanguage = nativeLanguage;

    let nativeUserLangData = await pool.query(`
    INSERT INTO userLanguages (
      user_id,
      language_id,
      nativeLanguage)
    VALUES (
      $1,
      $2,
      $3
    ) RETURNING *
    ;`, [userInformation.userInfo.id, nativeLanguageId, true]);
    // console.log("userInfo")
    // console.log(userInfo)
    // console.log("nativeUserLangInfo")
    let nativeLanguageData = nativeUserLangData.rows[0]//.longform;
    // console.log(nativeUserLangData)
    userInformation.userInfo.nativeLanguageData = nativeLanguageData;
    console.log(userInformation)
    //res.json(userInformation);


    // Display Target Language
    let targetUserLangInfo = await pool.query(`
    SELECT id
    FROM Languages
    WHERE longForm = $1
    ;`, [targetLanguage]);
    // console.log("targetUserLangInfo=====================")
    // console.log(targetLanguage)
    // console.log(targetUserLangInfo)
    let targetLanguageId = targetUserLangInfo.rows[0].id//.longform;
    // userInformation.userData[0].targetLanguage = targetLanguage;

    let targetUserLangData = await pool.query(`
    INSERT INTO userLanguages (
      user_id,
      language_id,
      nativeLanguage)
    VALUES (
      $1,
      $2,
      $3
    ) RETURNING *
    ;`, [userInformation.userInfo.id, targetLanguageId, false]);
    // console.log("userInfo")
    // console.log(userInfo)
    // console.log("nativeUserLangInfo")
    let targetLanguageData = targetUserLangData.rows[0]//.longform;
    userInformation.userInfo.targetLanguageData = targetLanguageData;
    // console.log(userInformation)

    // console.log("hello");
    res.status(201).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;
  console.log(user);
  let payload = {
    id: user.id,
    email: user.email,
  };

  try {
    const token = await sign(payload, process.env.SECRET);
    return res.status(200).cookie("token", token, { httpOnly: false }).json({
      success: true,
      id: user.id,
      token,
      message: "Logged in successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    res.status(200).json({
      info: "protected info",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.currentUser = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
