import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ConversationBlock from "./profileblocks/ConversationBlock";
const axios = require("axios").default;

const AllConversationsPage = (props) => {
  const [conversations, setConversations] = useState([]);
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
        .get("http://localhost:5000/api/all-conversations/", config)
        .then(function (response) {
          setConversations(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log("ERROROROR ---", error);
        });
    }
  }, []);
  console.log(conversations);
  let allConversations;
  if (conversations) {
    allConversations = conversations.map((conversation) => {
      return (
        <ConversationBlock key={conversation.id} conversation={conversation} />
      );
    });
  }

  return (
    <div>
      <Header />

      {allConversations}
      <Navbar currentUser={props.currentUser} />
    </div>
  );
};

export default AllConversationsPage;
