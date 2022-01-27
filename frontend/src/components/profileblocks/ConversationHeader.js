import "../../styles/profileblocks/ConversationHeader.scss";
import { useNavigate } from "react-router-dom";
const ConversationHeader = (props) => {
  const { name, username, image } = props.partner;
  let navigate = useNavigate();
  console.log(props.partner);
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
      <img src={image} alt="" />
    </div>
  );
};

export default ConversationHeader;
