const { check } = require("express-validator");
const pool = require("../db");

// Password
const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password must be between 6 and 15 characters.");

// Email
const email = check("email")
  .isEmail()
  .withMessage("Please enter a valid email.");

// Check if email exists
const emailExists = check("email").custom(async (value) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    value,
  ]);

  if (rows.length) {
    throw new Error("This email is already taken.");
  }
});

module.exports = {
  registerValidation: [email, password, emailExists],
};
