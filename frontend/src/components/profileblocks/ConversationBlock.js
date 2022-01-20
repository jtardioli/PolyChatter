import "../../styles/profileblocks/ConversationBlock.scss";
import { useNavigate } from "react-router-dom";
const ConversationBlock = (props) => {
  let navigate = useNavigate();
  const { id, name, username } = props.conversation;
  console.log(props.conversation);
  return (
    <div
      onClick={() => {
        navigate(`/conversation/${id}`);
      }}
      className="convo-block"
    >
      <h1>{name}</h1>
      <p>{username}</p>
    </div>
  );
};

export default ConversationBlock;
