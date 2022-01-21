const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const passport = require("passport");
require("./middlewares/passport-middleware");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

//Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
// app.io = require("socket.io")();

app.io = require("socket.io")({
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const editProfileRouter = require("./routes/edit_profile");
const consversationsRouter = require("./routes/conversations")(app.io);

// const io = require("socket.io")(5000);
// io.on("connection", (socket) => {
//   console.log(socket.id);
// });

app.use(logger("dev"));
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: false }));
// app.use(cors({ origin: true }));
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/", indexRouter);
app.use("/api", profileRouter);
app.use("/api", usersRouter);
app.use("/api", authRouter);
app.use("/api", editProfileRouter);
app.use("/api", consversationsRouter);

module.exports = app;
