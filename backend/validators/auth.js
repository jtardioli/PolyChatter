const { check } = require("express-validator");
const pool = require("../db");
const { compare } = require("bcryptjs");

// Password
const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password must be between 6 and 15 characters.");

const username = check("username")
  .isLength({ min: 4, max: 15 })
  .withMessage("Username must be between 4 and 15 characters.");

const name = check("name")
  .isLength({ min: 1, max: 20 })
  .withMessage("Name must be between 1 and 20 characters.");

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

// Login Validation
const loginFieldsCheck = check("email").custom(async (value, { req }) => {
  const user = await pool.query("SELECT * from users WHERE email = $1", [
    value,
  ]);
  if (!user.rows.length) {
    throw new Error("An account with that email does not exist.");
  }

  const validPassword = await compare(req.body.password, user.rows[0].password);
  if (!validPassword) {
    throw new Error("Wrong password!");
  }

  req.user = user.rows[0];
});

module.exports = {
  registerValidation: [email, password, emailExists, username, name],
  loginValidation: [loginFieldsCheck],
};
