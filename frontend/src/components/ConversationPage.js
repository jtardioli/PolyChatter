import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/ConversationPage.scss";
import Cookies from "js-cookie";

const axios = require("axios").default;
export const ConversationPage = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
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
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log("ERROROROR ---", error);
        });
    }
  }, []);

  const handleSubmit = () => {};

  return (
    <div className="conversation-container">
      <div className="messages-conatiner"></div>
      <form onSubmit={handleSubmit} className="send-container">
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="send-button">Send</button>
      </form>
    </div>
  );
};
