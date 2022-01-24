import "../../styles/profileblocks/ConversationBlock.scss";
import { useNavigate } from "react-router-dom";
const ConversationBlock = (props) => {
  let navigate = useNavigate();
  const { convoid, name, username } = props.conversation;

  return (
    <div
      onClick={() => {
        navigate(`/conversation/${convoid}`);
      }}
      className="convo-block"
    >
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60"
        alt=""
      />
      <div className="all-convo-info">
        <h1>{name}</h1>
        <p>@{username}</p>
      </div>
    </div>
  );
};

export default ConversationBlock;
