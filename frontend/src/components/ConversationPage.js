import { useParams } from "react-router-dom";
export const ConversationPage = () => {
  const { id } = useParams();
  return <div>This is the conversation with id: {id}</div>;
};
