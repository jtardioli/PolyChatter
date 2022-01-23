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
      <h1>{name}</h1>
      <p>{username}</p>
    </div>
  );
};

export default ConversationBlock;
