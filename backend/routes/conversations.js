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
  "/conversation-user-info/:id",
  validateJWTTokenMiddleware,
  async (req, res) => {
    const userid = req.user.id;
    const conversationid = req.params.id;
    try {
      let allConversations = await pool.query(
        `
        
        select * from conversations
          Join users on userb_id = users.id
          where usera_id = $1 and conversations.id = $2
          union
        select * from conversations
          Join users on usera_id = users.id
          where userb_id = $1 and conversations.id = $2
      ;`,
        [userid, conversationid]
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

let connected = 0;

module.exports = function (io) {
  //Socket.IO
  io.on("connection", function (socket) {
    console.log("connected: ", socket.id);
  });
  return router;
};
