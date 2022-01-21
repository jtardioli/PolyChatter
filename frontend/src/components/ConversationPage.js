import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/ConversationPage.scss";
import Cookies from "js-cookie";
import MessageBlock from "../components/profileblocks/MessageBlock";
import socket from "../socket";
const axios = require("axios").default;
export const ConversationPage = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [partner, setPartner] = useState({});
  const myMes = ["hello", "whats up", "nothing"];
  const [messages, setMessages] = useState(myMes);

  const token = Cookies.get("token"); // => 'value'
  if (!token) {
    // window.history.pushState({}, undefined, "/login");
  }

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/api/conversation-user-info/${id}`, config)
        .then(function (response) {
          setPartner(response.data[0]);
        })
        .catch(function (error) {
          // handle error
          console.log("ERROROROR ---", error);
        });
    }
  }, []);
  console.log(partner.id);
  const handleSubmit = () => {
    socket.emit("send-message", text, partner.id, id);
  };

  let allMessages;
  if (messages) {
    allMessages = messages.map((message) => {
      return <MessageBlock key={message} text={message} />;
    });
  }
  console.log(allMessages);

  return (
    <div className="conversation-container">
      <div className="messages-conatiner">{allMessages}</div>
      <form className="send-container">
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSubmit} className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
