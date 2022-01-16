var express = require("express");
var router = express.Router();
const { registerValidation } = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const pool = require("../db");

const register = async (req, res) => {
  try {
    console.log("validation passed");
  } catch (err) {
    console.log(err.message);
  }
};

router.post("/register", registerValidation, validationMiddleware, register);

module.exports = router;
