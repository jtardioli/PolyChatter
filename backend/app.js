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
const http = require("http");

app.io = require("socket.io")({
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const editProfileRouter = require("./routes/edit_profile");
const consversationsRouter = require("./routes/conversations")(app.io);

app.use(logger("dev"));
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
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

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);
  console.log(users);

  socket.on("userID", (userID) => {
    if (userID) users[userID] = socket.id;
  });
  socket.on("send-message", (test, to, convo) => {
    console.log(test, to, convo);
  });
});

server.listen(process.env.PORT, () => {
  console.log("listening on *:5000");
});
