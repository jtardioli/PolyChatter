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
        
        select conversations.id as convoID, users.*  from conversations
          Join users on userb_id = users.id
          where usera_id = $1
          union
        select conversations.id as convoID, users.* as id from conversations
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
    console.log(userid, req.params.id);
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

module.exports = (io) => {
  //Socket.IO
  io.on("connection", (socket) => {
    console.log("User has connected to Conversations");
    // ON Events
    // socket.on("chat message", function (message) {
    //   console.log("Successful Socket Test");
    // });
    // End ON Events

    socket.on("message", ({ name, message }) => {
      io.emit("message", { name, message });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return router;
};
