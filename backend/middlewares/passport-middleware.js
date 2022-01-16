const passport = require("passport");
const { Strategy } = require("passport-jwt");
const pool = require("../db");
require("dotenv").config();

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const opts = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, email FROM users WHERE id = $1`,
        [id]
      );
      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = { id: rows[0].id, email: rows[0].email };
      return done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);
