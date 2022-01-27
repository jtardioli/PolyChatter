import "../../styles/profileblocks/ConversationBlock.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const ConversationBlock = (props) => {
  let navigate = useNavigate();
  const { convoid, name, username, image } = props.conversation;
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="convo-block-wrap">
      <div
        onClick={() => {
          navigate(`/conversation/${convoid}`);
        }}
        className="convo-block"
      >
        <img src={image} alt="" />
        <div className="all-convo-info">
          <h1>{name}</h1>
          <p>@{username}</p>
        </div>
      </div>
      {deleteOpen ? (
        <div>
          <span
            onClick={() => {
              props.deleteChat(convoid, props.setRefetch);
            }}
            id="delete"
            className="material-icons material-icons-outlined"
          >
            delete_outline
          </span>
          <span
            onClick={() => {
              setDeleteOpen(false);
            }}
            id="close"
            className="material-icons material-icons-outlined"
          >
            close
          </span>
        </div>
      ) : (
        <span
          onClick={() => {
            setDeleteOpen(true);
          }}
          id="options"
          className="material-icons material-icons-outlined"
        >
          more_vert
        </span>
      )}
    </div>
  );
};

export default ConversationBlock;
