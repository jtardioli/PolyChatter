import "../../styles/profileblocks/ConversationHeader.scss";
import { useNavigate } from "react-router-dom";
const ConversationHeader = (props) => {
  const { name, username } = props.partner;
  let navigate = useNavigate();
  return (
    <div className="convo-head-wrap">
      <span
        id="back-chat"
        className="material-icons"
        onClick={() => {
          navigate(`/conversations`);
        }}
      >
        arrow_back_ios
      </span>

      <div className="convo-info">
        <h1>{name}</h1>
        {/* <h2>@{username}</h2> */}
      </div>
      <img
        src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt=""
      />
    </div>
  );
};

export default ConversationHeader;
