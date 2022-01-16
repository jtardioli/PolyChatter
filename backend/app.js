const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
require("./middlewares/passport-middleware");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profile")
const authRouter = require("./routes/auth");

const app = express();

app.use(logger("dev"));
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/profile", profileRouter)
app.use("/", usersRouter);
app.use("/api", authRouter);

module.exports = app;
