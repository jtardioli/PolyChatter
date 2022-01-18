var express = require("express");
var router = express.Router();
const {
  register,
  login,
  protected,
  logout,
  currentUser,
} = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const {
  validateJWTTokenMiddleware,
} = require("../middlewares/auth-middleware");

// router.get("/protected", userAuth, protected);
router.get("/current-user", validateJWTTokenMiddleware, currentUser);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", validateJWTTokenMiddleware, logout);

module.exports = router;
