import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ConversationBlock from "./profileblocks/ConversationBlock";
const axios = require("axios").default;

const AllConversationsPage = (props) => {
  const [conversations, setConversations] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const token = Cookies.get("token"); // => 'value'

  const deleteChat = async (convoID, setRefetch) => {
    console.log("inside delete");
    axios.post(`http://localhost:5000/api/delete/${convoID}`);

    setRefetch(true);
  };
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

          setRefetch(false);
        })
        .catch(function (error) {
          // handle error
          console.log("ERROROROR ---", error);
        });
    }
  }, [refetch]);
  console.log(conversations);
  let allConversations;
  if (conversations) {
    allConversations = conversations.map((conversation) => {
      return (
        <ConversationBlock
          deleteChat={deleteChat}
          key={conversation.id}
          conversation={conversation}
          setRefetch={setRefetch}
        />
      );
    });
  }

  return (
    <div>
      <Header text="Chats" />

      {allConversations}
      <Navbar currentUser={props.currentUser} />
    </div>
  );
};

export default AllConversationsPage;
