import "../../styles/profileblocks/ConversationBlock.scss";

const ConversationBlock = (props) => {
  const { id, name, username } = props.conversation;
  return (
    <div className="convo-block">
      <h1>{name}</h1>
      <p>{username}</p>
    </div>
  );
};

export default ConversationBlock;
