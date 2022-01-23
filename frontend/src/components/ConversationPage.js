import React, { useState, useEffect } from "react";
import "../styles/layout/ConversationPage.scss";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Message from "./Message";
import PartnerMessage from "./PartnerMessage";
import Cookies from "js-cookie";
import axios from "axios";
import ConversationHeader from "./profileblocks/ConversationHeader";
const socket = io("http://localhost:5000");

export const ConversationPage = (props) => {
  const { id } = useParams();

  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const [partner, setPartner] = useState({});

  const token = Cookies.get("token"); // => 'value'

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

  const onTextChange = (e) => {
    setState({
      ...state,
      message: e.target.textContent,
      name: props.currentUser,
    });
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
    document.querySelector(".message-input").innerHTML = "";
    document.querySelector(".message-input").focus();
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => {
      if (name === props.currentUser) {
        return <Message key={index} name={name} message={message} />;
      } else {
        return <PartnerMessage key={index} name={name} message={message} />;
      }
    });
  };
  return (
    <div className="chat-page-wrap">
      <ConversationHeader partner={partner} />
      <div className="chat-box">{renderChat()}</div>
      <form onSubmit={onMessageSubmit}>
        <div
          name="message"
          onInput={(e) => onTextChange(e)}
          contentEditable={true}
          className="message-input"
        ></div>

        <button className="send-btn">
          <span
            id="send-icon"
            className="material-icons material-icons-outlined"
          >
            send
          </span>
        </button>
      </form>
    </div>
  );
};
