var express = require("express");
var router = express.Router();
const { registerValidation } = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const { hash } = require("bcryptjs");
const pool = require("../db");

const register = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    await pool.query(
      `INSERT INTO users (username, name, email, password)
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

router.post("/register", registerValidation, validationMiddleware, register);

module.exports = router;
