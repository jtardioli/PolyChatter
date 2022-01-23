import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "../styles/layout/ConversationPage.scss";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Message from "./Message";
const socket = io("http://localhost:5000");

export const ConversationPage = () => {
  const { id } = useParams();

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
      <Message key={index} name={name} message={message} />
    ));
  };

  return (
    <>
      {/* <div>This is the conversation with id: {id}</div>
    <button onClick = {() => { socket.emit('chat message')}}>click me</button> */}

      <div className="card">
        <form onSubmit={onMessageSubmit}>
          <h1>Messenger</h1>
          <div className="name-field">
            <TextField
              name="name"
              onChange={(e) => onTextChange(e)}
              value={state.name}
              label="Name"
            />
          </div>
          <div className="name-field">
            <TextField
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button> Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
      </div>
    </>
  );
};
