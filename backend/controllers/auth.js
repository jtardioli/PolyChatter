const { hash } = require("bcryptjs");
const pool = require("../db");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  console.log(req.body);
  const { username, name, email, password } = req.body;
  console.log(req.body)
  try {
    const hashedPassword = await hash(password, 10);
    await pool.query(
      `INSERT INTO users (username, name, email, password, country_id)
    VALUES ($1, $2, $3, $4);`,
      [username, name, email, hashedPassword]
    );
    res.status(201).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (err) {
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
    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
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
