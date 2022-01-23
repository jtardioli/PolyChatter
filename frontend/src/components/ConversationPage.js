import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "../styles/layout/ConversationPage.scss";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Message from "./Message";
const socket = io("http://localhost:5000");

export const ConversationPage = (props) => {
  const { id } = useParams();
  console.log("This is the current user", props.currentUser);
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <Message key={index} name={props.currentUser} message={message} />
    ));
  };

  return (
    <div>
      <div className="render-chat">{renderChat()}</div>
      <form onSubmit={onMessageSubmit}>
        <div className="name-field">
          <input
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
          />
        </div>
        <button> Send Message</button>
      </form>
    </div>
  );
};
