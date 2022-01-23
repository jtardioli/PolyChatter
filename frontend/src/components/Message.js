import "../styles/Message.scss";

const Message = (props) => {
  return (
    <div className="my-message">
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
