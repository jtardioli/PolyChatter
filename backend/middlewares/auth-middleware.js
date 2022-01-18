const { verify } = require("jsonwebtoken");

exports.validateJWTTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token)
  if (token == null) return res.sendStatus(401);

  verify(token, process.env.SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    console.log("This is user form backend >>>>>>", user);

    req.user = user;
    next();
  });
};
