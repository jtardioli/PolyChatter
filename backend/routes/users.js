var express = require("express");
var router = express.Router();
const pool = require("../db");

/* GET users listing. */
router.post("/", function (req, res) {
  console.log(req.body);
});

module.exports = router;
