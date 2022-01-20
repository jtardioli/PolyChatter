import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
export const ConversationPage = () => {
  const { id } = useParams();
  return <div>This is the conversation with id: {id}</div>;
};
