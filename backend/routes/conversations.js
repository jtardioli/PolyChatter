const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  validateJWTTokenMiddleware,
} = require("../middlewares/auth-middleware");

router.get(
  "/all-conversations/",
  validateJWTTokenMiddleware,
  async (req, res) => {
    const userid = req.user.id;
    try {
      // if user a = curuser => info userb
      // select * from conversations
      // Join users on userb_id = users.id
      // where usera_id = $1
      // =================================
      // select * from conversations
      // Join users on usera_id = users.id
      // where userb_id = $1
      // =================================
      // SELECT x.a, y.b FROM (SELECT * from a) as x, (SELECT * FROM b) as y
      let allConversations = await pool.query(
        `
        
        select * from conversations
          Join users on userb_id = users.id
          where usera_id = $1
          union
        select * from conversations
          Join users on usera_id = users.id
          where userb_id = $1
      ;`,
        [userid]
      );
      allConversations = allConversations.rows;
      res.send(allConversations);
    } catch (error) {
      console.log(error.message);
    }
  }
);

router.get(
  "/conversation/:id/",
  validateJWTTokenMiddleware,
  async (req, res) => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports =  (io) => {
  //Socket.IO
  io.on("connection",  (socket) => {
    console.log("User has connected to Conversations");
    // ON Events
    // socket.on("chat message", function (message) {
    //   console.log("Successful Socket Test");
    // });
    // End ON Events

    socket.on('message', ({ name, message }) => {
      io.emit('message', {name, message})
    })  
  
    socket.on("disconnect", () => {
      console.log('user disconnected');
    });

  });
  return router;
};
